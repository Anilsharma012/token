import express, { Request, Response } from 'express';
import mongoose, { Schema, Document } from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config({ path: '../.env.local' });

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB Atlas using connection string in environment
const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('MONGODB_URI is not defined. Check your .env.local file.');
  process.exit(1);
}
console.log('Attempting MongoDB connection using URI:', uri);

// helper to try an alternate non-SRV URL if SRV lookup fails
function tryFallback(srvUri: string) {
  if (!srvUri.startsWith('mongodb+srv://')) return null;
  try {
    const withoutPrefix = srvUri.replace('mongodb+srv://', '');
    const [credsHost, rest] = withoutPrefix.split('/');
    // credsHost = user:pass@cluster0.r8t4hqs.mongodb.net
    const [creds, host] = credsHost.split('@');
    const clusterBase = host.split('.mongodb.net')[0];
    // build default three-shard host list (Atlas uses this pattern for new clusters)
    const shards = [
      `${clusterBase}-shard-00-00.${clusterBase}.mongodb.net:27017`,
      `${clusterBase}-shard-00-01.${clusterBase}.mongodb.net:27017`,
      `${clusterBase}-shard-00-02.${clusterBase}.mongodb.net:27017`
    ];
    const dbAndOpts = rest; // include db name and query options
    const alt = `mongodb://${creds}@${shards.join(',')}/${dbAndOpts}`;
    return alt;
  } catch {
    return null;
  }
}

mongoose
  .connect(uri)
  .then(() => console.log('Connected to MongoDB Atlas'))
  .catch(async (err) => {
    console.error('MongoDB connection error', err);
    if (err && err.code === 'ECONNREFUSED') {
      const alt = tryFallback(uri);
      if (alt) {
        console.warn('SRV lookup failed; retrying with fallback URI:', alt);
        try {
          await mongoose.connect(alt);
          console.log('Connected to MongoDB Atlas via fallback URI');
          return;
        } catch (err2) {
          console.error('Fallback connection also failed', err2);
        }
      }
    }
    // you can inspect err.message or err.code for more details
  });

// --- SCHEMAS & MODELS ---
interface AdminDoc extends Document {
  username: string;
  password: string; // NOTE: store hashed password in production
}
const AdminSchema = new Schema<AdminDoc>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Admin = mongoose.model<AdminDoc>('Admin', AdminSchema);

const PlanSchema = new Schema({
  role: String,
  name: String,
  durationDays: Number,
  price: Number,
  status: String,
  isRecommended: Boolean,
  features: [String],
  credits: Schema.Types.Mixed
});
const Plan = mongoose.model('Plan', PlanSchema);

// optional configuration collection for admin navigation/menu
const AdminMenuSchema = new Schema({
  group: String,
  items: Schema.Types.Mixed // array of { label, icon, alert? }
});
const AdminMenu = mongoose.model('AdminMenu', AdminMenuSchema);

const SubscriptionSchema = new Schema({
  userId: String,
  userName: String,
  role: String,
  planId: String,
  planName: String,
  startDate: String,
  expiryDate: String,
  status: String,
  creditsRemaining: Schema.Types.Mixed
});
const Subscription = mongoose.model('Subscription', SubscriptionSchema);

const TransactionSchema = new Schema({
  userId: String,
  userName: String,
  planName: String,
  amount: Number,
  status: String,
  method: String,
  date: String
});
const Transaction = mongoose.model('Transaction', TransactionSchema);

const CouponSchema = new Schema({
  code: String,
  role: String,
  discountType: String,
  value: Number,
  validUntil: String,
  usageLimit: Number,
  usageCount: Number
});
const Coupon = mongoose.model('Coupon', CouponSchema);

const AuditLogSchema = new Schema({
  adminName: String,
  action: String,
  target: String,
  timestamp: String,
  details: String
});
const AuditLog = mongoose.model('AuditLog', AuditLogSchema);

// --- ROUTES ---
app.post('/api/admin/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username, password }).exec();
    if (admin) {
      return res.json({ success: true });
    } else {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

app.get('/api/plans', async (req: Request, res: Response) => {
  const plans = await Plan.find().exec();
  res.json(plans);
});

app.get('/api/subscriptions', async (req: Request, res: Response) => {
  const subs = await Subscription.find().exec();
  res.json(subs);
});

app.get('/api/transactions', async (req: Request, res: Response) => {
  const tx = await Transaction.find().exec();
  res.json(tx);
});

app.get('/api/coupons', async (req: Request, res: Response) => {
  const cp = await Coupon.find().exec();
  res.json(cp);
});

app.get('/api/auditlogs', async (req: Request, res: Response) => {
  const logs = await AuditLog.find().exec();
  res.json(logs);
});

// menu configuration endpoint
app.get('/api/admin/menu', async (req: Request, res: Response) => {
  const menu = await AdminMenu.find().exec();
  res.json(menu);
});

// convenience endpoint to fetch everything at once
app.get('/api/admin/all', async (req: Request, res: Response) => {
  const [plans, subs, tx, cp, logs] = await Promise.all([
    Plan.find().exec(),
    Subscription.find().exec(),
    Transaction.find().exec(),
    Coupon.find().exec(),
    AuditLog.find().exec()
  ]);
  res.json({ plans, subscriptions: subs, transactions: tx, coupons: cp, auditLogs: logs });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});