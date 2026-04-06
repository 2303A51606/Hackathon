import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TopBar } from './components/TopBar';
import { BottomNav } from './components/BottomNav';
import { SubscriptionCard } from './components/SubscriptionCard';
import { InsightCard } from './components/InsightCard';
import { SpendingBarChart, SpendingLineChart, CategoryPieChart } from './components/Charts';
import { MailDialog } from './components/MailDialog';
import { MOCK_SUBSCRIPTIONS, MOCK_PAYMENT_HISTORY, MOCK_CATEGORY_SPEND } from './constants';
import { Plus, Search, Filter, MoreVertical, CheckCircle2, PauseCircle, XCircle, TrendingDown, TrendingUp, ArrowRight, Bell, User, Calendar, Mail } from 'lucide-react';
import { cn } from './lib/utils';
import { Subscription } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [selectedSub, setSelectedSub] = useState<Subscription | null>(null);
  const [mailSub, setMailSub] = useState<Subscription | null>(null);

  const renderHome = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-on-surface-variant font-medium text-sm">Welcome, Neha!</p>
            <h1 className="font-headline font-extrabold text-4xl text-on-surface mt-1">
              $240<span className="text-lg font-bold text-on-surface-variant">/mo</span>
            </h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="flex items-center text-secondary text-sm font-bold">
              <TrendingUp size={16} className="mr-1" /> 12%
            </span>
            <p className="text-[10px] uppercase tracking-widest text-on-surface-variant font-headline font-bold">vs last month</p>
          </div>
        </div>
        <SpendingBarChart />
      </section>

      <InsightCard 
        variant="alert"
        title="Price Hike Warning"
        description="Netflix Premium is increasing from $19.99 to $22.99 starting next billing cycle."
      />

      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-headline font-bold text-lg text-on-surface">Upcoming Payments</h2>
          <button className="text-primary text-xs font-bold uppercase tracking-widest" onClick={() => setActiveTab('subs')}>View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto no-scrollbar -mx-6 px-6 pb-2">
          {MOCK_SUBSCRIPTIONS.slice(0, 3).map(sub => (
            <SubscriptionCard 
              key={sub.id} 
              subscription={sub} 
              variant="compact" 
              onClick={() => setSelectedSub(sub)}
              onMailClick={() => setMailSub(sub)}
            />
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="font-headline font-bold text-lg text-on-surface">Categories</h2>
        <div className="flex gap-3 overflow-x-auto no-scrollbar -mx-6 px-6">
          {['Entertainment', 'Fitness', 'Utilities', 'Food'].map((cat, i) => (
            <div 
              key={cat}
              className={cn(
                "shrink-0 flex items-center gap-2 px-4 py-2 rounded-full font-headline text-xs font-bold transition-colors",
                i === 0 ? "bg-secondary-container text-on-secondary-container" : "bg-surface-container-high text-on-surface-variant"
              )}
            >
              {cat}
            </div>
          ))}
        </div>
      </section>

      <InsightCard 
        title="Optimizer Insight"
        description="You haven't used Disney+ in 3 weeks. Cancel and save $14/mo?"
        actionLabel="Review"
      />
    </motion.div>
  );

  const renderSubs = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <section className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-outline" />
          </div>
          <input 
            className="w-full bg-surface-container-highest border-none rounded-2xl py-4 pl-12 pr-4 text-on-surface placeholder:text-outline focus:ring-2 focus:ring-secondary transition-all outline-none" 
            placeholder="Search subscriptions..." 
            type="text"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
          {['All', 'Entertainment', 'Fitness', 'Utility', 'Software'].map((cat, i) => (
            <button 
              key={cat}
              className={cn(
                "px-5 py-2 rounded-full font-medium text-sm whitespace-nowrap transition-all",
                i === 0 ? "bg-primary text-white" : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      <div className="bg-surface-container-low p-1.5 rounded-2xl flex">
        {['Active', 'Paused', 'Inactive'].map((status, i) => (
          <button 
            key={status}
            className={cn(
              "flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all",
              i === 0 ? "bg-surface-container-lowest shadow-sm text-primary" : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            {status}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4">
        {MOCK_SUBSCRIPTIONS.map(sub => (
          <SubscriptionCard 
            key={sub.id} 
            subscription={sub} 
            onClick={() => setSelectedSub(sub)}
            onMailClick={() => setMailSub(sub)}
          />
        ))}
      </div>

      <div className="p-6 bg-surface-container-lowest rounded-[1.5rem] relative overflow-hidden shadow-sm">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary"></div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-secondary mb-1 font-headline">Financial Insight</p>
            <h4 className="text-on-surface font-bold text-lg">Total Monthly Spend: $90.97</h4>
            <p className="text-on-surface-variant text-sm mt-1">You are spending 12% less than last month. Keep it up!</p>
          </div>
          <div className="w-16 h-16 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
            <TrendingDown size={32} />
          </div>
        </div>
      </div>
    </motion.div>
  );

  const renderData = () => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-8"
    >
      <section>
        <div className="flex justify-between items-end mb-4">
          <div>
            <span className="font-headline text-xs font-bold text-secondary tracking-widest uppercase mb-1 block">Overview</span>
            <h2 className="font-headline font-extrabold text-2xl text-on-surface">Monthly Spending Trend</h2>
          </div>
          <div className="text-right">
            <span className="font-headline font-bold text-xl text-primary">$214.50</span>
            <span className="block font-headline text-[10px] text-on-surface-variant font-bold">AVG / MONTH</span>
          </div>
        </div>
        <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
          <SpendingLineChart />
        </div>
      </section>

      <section className="bg-surface-container-lowest rounded-3xl p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-headline font-bold text-lg">Spend by Category</h3>
          <MoreVertical size={20} className="text-on-surface-variant" />
        </div>
        <div className="flex items-center gap-8">
          <CategoryPieChart />
          <div className="space-y-3 flex-1">
            {MOCK_CATEGORY_SPEND.map(item => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="font-sans text-xs text-on-surface-variant font-medium">{item.name}</span>
                </div>
                <span className="font-sans text-xs font-bold">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-primary to-primary-container rounded-3xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-secondary/20 rounded-full blur-2xl"></div>
        <div className="flex items-start gap-4 relative z-10">
          <div className="bg-secondary-fixed/20 p-3 rounded-2xl">
            <TrendingDown size={32} className="text-secondary-fixed" />
          </div>
          <div>
            <h3 className="font-headline font-bold text-white text-lg mb-1">Savings Potential</h3>
            <p className="text-sm text-primary-fixed/80 leading-relaxed">
              You could save <span className="text-secondary-fixed font-bold">$35/mo</span> by switching to annual plans or canceling unused services.
            </p>
          </div>
        </div>
        <button className="mt-6 w-full py-3 bg-secondary-fixed text-on-secondary-fixed font-bold rounded-xl hover:opacity-90 transition-all flex items-center justify-center gap-2">
          Review Opportunities
          <ArrowRight size={16} />
        </button>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-headline font-extrabold text-xl text-on-surface">Least Used</h2>
          <button className="font-headline text-xs text-secondary font-bold hover:underline">VIEW ALL</button>
        </div>
        <div className="space-y-3">
          {MOCK_SUBSCRIPTIONS.filter(s => s.usageHours !== undefined).map(sub => (
            <div key={sub.id} className="bg-surface-container-low/50 rounded-2xl p-4 flex items-center justify-between group hover:bg-surface-container-low transition-all">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center shadow-sm">
                  <TrendingDown size={20} className="text-error" />
                </div>
                <div>
                  <h4 className="font-headline font-bold text-on-surface">{sub.name}</h4>
                  <p className="text-xs text-error font-medium">{sub.usageHours} hours used this month</p>
                </div>
              </div>
              <div className="text-right">
                <span className="block font-headline font-bold text-sm text-on-surface">${sub.price}</span>
                <span className="text-[10px] text-on-surface-variant uppercase font-bold">MONTHLY</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );

  const renderDetail = (sub: Subscription) => (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      className="space-y-8"
    >
      <section className="relative pt-4">
        <div className="bg-gradient-to-br from-primary to-primary-container rounded-[2rem] p-8 relative overflow-hidden shadow-xl">
          <div className="absolute top-0 right-0 w-32 h-32 bg-secondary/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-10">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center p-2 shadow-xl">
              <span className="text-3xl" style={{ color: sub.color }}>📺</span>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-[0.2em] text-on-primary-container/80 mb-1 font-bold">Renews on</p>
              <p className="font-headline font-bold text-white text-lg">Oct 15, 2023</p>
            </div>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-white/70 text-2xl font-light">$</span>
            <h2 className="text-white text-5xl font-extrabold tracking-tighter">{sub.price}</h2>
            <span className="text-white/70 font-medium text-lg ml-1">/mo</span>
          </div>
        </div>
      </section>

      <section>
        <div className="bg-surface-container-lowest rounded-xl p-5 relative overflow-hidden flex items-center justify-between shadow-sm">
          <div className="absolute left-0 top-0 bottom-0 w-1 bg-secondary rounded-full my-3"></div>
          <div>
            <h3 className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-1 font-headline">Subscription Status</h3>
            <p className="font-headline font-bold text-on-surface text-lg">Active (Standard HD Plan)</p>
          </div>
          <CheckCircle2 size={24} className="text-secondary" />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <button className="col-span-2 bg-primary text-white rounded-2xl p-5 flex items-center justify-between active:scale-[0.98] transition-transform shadow-lg">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center">
              <Plus size={20} />
            </div>
            <span className="font-headline font-bold">Manage Subscription</span>
          </div>
          <ArrowRight size={20} className="text-white/50" />
        </button>
        
        <button 
          onClick={() => setMailSub(sub)}
          className="col-span-2 bg-surface-container-lowest border-2 border-primary/10 rounded-2xl p-5 flex items-center justify-between active:scale-[0.98] transition-transform hover:bg-primary/5"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
              <Mail size={20} />
            </div>
            <span className="font-headline font-bold text-on-surface">Send Prototype Mail</span>
          </div>
          <ArrowRight size={20} className="text-primary/30" />
        </button>

        <div className="bg-surface-container-low rounded-2xl p-5 flex flex-col justify-between h-32">
          <PauseCircle size={24} className="text-primary" />
          <div className="flex items-center justify-between">
            <span className="font-headline font-bold text-on-surface leading-tight">Pause<br/>Payment</span>
            <div className="w-10 h-6 bg-outline-variant/30 rounded-full relative p-1 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        </div>
        <div className="bg-error-container/50 rounded-2xl p-5 flex flex-col justify-between h-32 hover:bg-error-container transition-colors group">
          <XCircle size={24} className="text-error" />
          <span className="font-headline font-bold text-error leading-tight">Cancel<br/>Subscription</span>
        </div>
      </section>

      <section className="bg-[#fdf2f2] rounded-2xl p-6 border-l-4 border-error/20">
        <div className="flex items-center gap-3 mb-2">
          <TrendingDown size={20} className="text-error" />
          <h3 className="font-headline font-bold text-on-surface">Optimize Your Spending</h3>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">
          You've spent $191.88 on {sub.name} this year. <span className="font-bold text-on-surface">Switch to Annual for 20% off</span> and save $38.40 per year.
        </p>
      </section>

      <section className="pb-12">
        <h3 className="font-headline font-bold text-on-surface mb-4">Payment History</h3>
        <div className="space-y-4">
          {MOCK_PAYMENT_HISTORY.map(history => (
            <div key={history.id} className="bg-surface-container-lowest p-4 rounded-xl flex items-center justify-between group hover:bg-surface-container-low transition-colors shadow-sm">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-secondary-container/30 rounded-full flex items-center justify-center">
                  <Calendar size={16} className="text-on-secondary-container" />
                </div>
                <div>
                  <p className="font-headline font-bold text-on-surface">{history.date}</p>
                  <p className="text-on-surface-variant text-xs font-medium">{history.method}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-headline font-bold text-on-surface">${history.amount}</p>
                <p className="text-secondary text-[10px] font-bold uppercase tracking-widest">{history.status}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-surface pb-32">
      <TopBar 
        title={selectedSub ? selectedSub.name : activeTab === 'home' ? 'SubTrack' : activeTab === 'subs' ? 'Subscriptions' : activeTab === 'data' ? 'Insights' : 'Alerts'} 
        showBack={!!selectedSub}
        onBack={() => setSelectedSub(null)}
      />
      
      <main className="pt-24 px-6 max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {selectedSub ? (
            renderDetail(selectedSub)
          ) : (
            <>
              {activeTab === 'home' && renderHome()}
              {activeTab === 'subs' && renderSubs()}
              {activeTab === 'data' && renderData()}
              {activeTab === 'alerts' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center h-[60vh] text-on-surface-variant"
                >
                  <Bell size={48} className="mb-4 opacity-20" />
                  <p className="font-headline font-bold">No new alerts</p>
                </motion.div>
              )}
              {activeTab === 'profile' && (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="flex flex-col items-center justify-center h-[60vh] text-on-surface-variant"
                >
                  <User size={48} className="mb-4 opacity-20" />
                  <p className="font-headline font-bold">Profile settings</p>
                </motion.div>
              )}
            </>
          )}
        </AnimatePresence>
      </main>

      {!selectedSub && (
        <motion.button 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-28 right-6 w-14 h-14 bg-gradient-to-br from-primary to-primary-container text-white rounded-2xl flex items-center justify-center shadow-xl z-40"
        >
          <Plus size={28} />
        </motion.button>
      )}

      <BottomNav activeTab={activeTab} onTabChange={(tab) => {
        setActiveTab(tab);
        setSelectedSub(null);
      }} />

      <MailDialog 
        isOpen={!!mailSub}
        onClose={() => setMailSub(null)}
        subscriptionName={mailSub?.name || ''}
        price={mailSub?.price || 0}
      />
    </div>
  );
}
