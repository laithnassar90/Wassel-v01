import { Wallet, CreditCard, TrendingUp, TrendingDown, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Payments() {
  return (
    <div className="max-w-7xl mx-auto space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1>Payments & Wallet</h1>
          <p className="text-gray-600">Manage your transactions and balance</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Funds
        </Button>
      </div>

      {/* Wallet Balance */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Wallet Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-4xl text-primary">$250.00</div>
              <div className="flex gap-2">
                <Button size="sm" className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
                  Add Funds
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  Withdraw
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-red-500" />
                <span className="text-sm text-gray-600">Spent</span>
              </div>
              <div className="text-2xl">$215.00</div>
              <p className="text-sm text-gray-500">5 trips</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-600">Earned</span>
              </div>
              <div className="text-2xl">$180.00</div>
              <p className="text-sm text-gray-500">3 rides offered</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Methods */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Manage your cards and payment options</CardDescription>
            </div>
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              Add Card
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{method.name}</p>
                    <p className="text-sm text-gray-500">•••• {method.last4}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {method.isDefault && (
                    <Badge variant="outline">Default</Badge>
                  )}
                  <Button variant="ghost" size="sm">Remove</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Your recent payments and earnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div
                key={transaction.id}
                className="flex items-center justify-between p-4 border-b last:border-0"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.type === 'earning'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {transaction.type === 'earning' ? (
                      <TrendingUp className="w-5 h-5" />
                    ) : (
                      <TrendingDown className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-medium ${
                    transaction.type === 'earning' ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {transaction.type === 'earning' ? '+' : '-'}${transaction.amount}
                  </p>
                  <Badge variant="outline" className="mt-1">{transaction.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

const paymentMethods = [
  {
    id: 1,
    name: 'Visa',
    last4: '4242',
    isDefault: true
  },
  {
    id: 2,
    name: 'Mastercard',
    last4: '8888',
    isDefault: false
  }
];

const transactions = [
  {
    id: 1,
    type: 'payment',
    description: 'Dubai → Abu Dhabi with Ahmed Hassan',
    date: 'Oct 3, 2025',
    amount: 90,
    status: 'Completed'
  },
  {
    id: 2,
    type: 'earning',
    description: 'Cairo → Alexandria trip (2 passengers)',
    date: 'Oct 1, 2025',
    amount: 70,
    status: 'Completed'
  },
  {
    id: 3,
    type: 'payment',
    description: 'Riyadh → Jeddah with Sarah Mohammed',
    date: 'Sep 30, 2025',
    amount: 120,
    status: 'Pending'
  },
  {
    id: 4,
    type: 'earning',
    description: 'Amman → Aqaba trip (3 passengers)',
    date: 'Sep 28, 2025',
    amount: 105,
    status: 'Completed'
  },
  {
    id: 5,
    type: 'payment',
    description: 'Added funds to wallet',
    date: 'Sep 25, 2025',
    amount: 200,
    status: 'Completed'
  }
];
