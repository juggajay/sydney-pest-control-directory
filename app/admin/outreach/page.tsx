'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { createClient } from '@supabase/supabase-js';
import {
  Mail,
  Eye,
  MousePointer,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  RefreshCw,
  Plus,
  Link as LinkIcon,
  TrendingUp
} from 'lucide-react';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON || '';
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

interface Stats {
  pending: number;
  sent: number;
  opened: number;
  clicked: number;
  converted: number;
  bounced: number;
  unsubscribed: number;
}

interface RecentEmail {
  id: string;
  operator_name: string;
  operator_email: string;
  status: string;
  initial_sent_at: string;
}

export default function OutreachDashboard() {
  const [stats, setStats] = useState<Stats>({
    pending: 0,
    sent: 0,
    opened: 0,
    clicked: 0,
    converted: 0,
    bounced: 0,
    unsubscribed: 0,
  });
  const [recentEmails, setRecentEmails] = useState<RecentEmail[]>([]);
  const [loading, setLoading] = useState(true);
  const [sendingEmails, setSendingEmails] = useState(false);
  const [checkingBacklinks, setCheckingBacklinks] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    fetchStats();
    fetchRecentEmails();
  }, []);

  async function fetchStats() {
    if (!supabase) return;

    const statuses = ['pending', 'sent', 'opened', 'clicked', 'converted', 'bounced', 'unsubscribed'];
    const newStats: Stats = {
      pending: 0,
      sent: 0,
      opened: 0,
      clicked: 0,
      converted: 0,
      bounced: 0,
      unsubscribed: 0,
    };

    for (const status of statuses) {
      const { count } = await supabase
        .from('outreach_queue')
        .select('*', { count: 'exact', head: true })
        .eq('status', status);

      newStats[status as keyof Stats] = count || 0;
    }

    setStats(newStats);
    setLoading(false);
  }

  async function fetchRecentEmails() {
    if (!supabase) return;

    const { data } = await supabase
      .from('outreach_queue')
      .select('id, operator_name, operator_email, status, initial_sent_at')
      .not('initial_sent_at', 'is', null)
      .order('initial_sent_at', { ascending: false })
      .limit(10);

    setRecentEmails(data || []);
  }

  async function triggerSendEmails() {
    setSendingEmails(true);
    setMessage(null);

    try {
      const response = await fetch('/api/outreach/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'pest_arrest_cron_secret_2024_xK9mP2vL'}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Sent ${result.initialSent} initial emails and ${result.followupsSent} follow-ups`,
        });
        fetchStats();
        fetchRecentEmails();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to send emails' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    }

    setSendingEmails(false);
  }

  async function triggerCheckBacklinks() {
    setCheckingBacklinks(true);
    setMessage(null);

    try {
      const response = await fetch('/api/outreach/check-backlinks', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'pest_arrest_cron_secret_2024_xK9mP2vL'}`,
        },
      });

      const result = await response.json();

      if (response.ok) {
        setMessage({
          type: 'success',
          text: `Checked ${result.checked} websites, found ${result.backlinksFound} backlinks`,
        });
        fetchStats();
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to check backlinks' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'Network error' });
    }

    setCheckingBacklinks(false);
  }

  const totalSent = stats.sent + stats.opened + stats.clicked + stats.converted;
  const totalEngaged = stats.opened + stats.clicked + stats.converted;
  const openRate = totalSent > 0 ? ((totalEngaged / totalSent) * 100).toFixed(1) : '0';
  const clickRate = totalSent > 0 ? (((stats.clicked + stats.converted) / totalSent) * 100).toFixed(1) : '0';
  const conversionRate = totalSent > 0 ? ((stats.converted / totalSent) * 100).toFixed(1) : '0';

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-gray-100 text-gray-700';
      case 'sent': return 'bg-blue-100 text-blue-700';
      case 'opened': return 'bg-yellow-100 text-yellow-700';
      case 'clicked': return 'bg-purple-100 text-purple-700';
      case 'converted': return 'bg-green-100 text-green-700';
      case 'bounced': return 'bg-red-100 text-red-700';
      case 'unsubscribed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'sent': return <Mail className="w-4 h-4" />;
      case 'opened': return <Eye className="w-4 h-4" />;
      case 'clicked': return <MousePointer className="w-4 h-4" />;
      case 'converted': return <CheckCircle className="w-4 h-4" />;
      case 'bounced': return <XCircle className="w-4 h-4" />;
      case 'unsubscribed': return <AlertCircle className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-50 flex items-center justify-center">
        <RefreshCw className="w-8 h-8 animate-spin text-primary-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Outreach Dashboard</h1>
            <p className="text-neutral-600 mt-1">Manage backlink outreach campaigns</p>
          </div>
          <div className="flex gap-3 mt-4 sm:mt-0">
            <Link
              href="/admin/outreach/campaigns/new"
              className="btn btn-primary"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Campaign
            </Link>
          </div>
        </div>

        {/* Message Alert */}
        {message && (
          <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
            {message.text}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-8">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="card p-4">
              <div className="flex items-center gap-2 mb-2">
                <div className={`p-2 rounded-lg ${getStatusColor(key)}`}>
                  {getStatusIcon(key)}
                </div>
              </div>
              <div className="text-2xl font-bold text-neutral-900">{value}</div>
              <div className="text-sm text-neutral-500 capitalize">{key}</div>
            </div>
          ))}
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              <span className="text-sm font-medium text-neutral-500">Open Rate</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{openRate}%</div>
            <div className="text-xs text-neutral-500 mt-1">
              {totalEngaged} opened / {totalSent} sent
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <MousePointer className="w-5 h-5 text-purple-600" />
              <span className="text-sm font-medium text-neutral-500">Click Rate</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{clickRate}%</div>
            <div className="text-xs text-neutral-500 mt-1">
              {stats.clicked + stats.converted} clicked / {totalSent} sent
            </div>
          </div>
          <div className="card p-6">
            <div className="flex items-center gap-3 mb-2">
              <LinkIcon className="w-5 h-5 text-green-600" />
              <span className="text-sm font-medium text-neutral-500">Conversion Rate</span>
            </div>
            <div className="text-3xl font-bold text-neutral-900">{conversionRate}%</div>
            <div className="text-xs text-neutral-500 mt-1">
              {stats.converted} converted / {totalSent} sent
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6 mb-8">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Quick Actions</h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={triggerSendEmails}
              disabled={sendingEmails}
              className="btn btn-secondary"
            >
              {sendingEmails ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <Mail className="w-4 h-4 mr-2" />
              )}
              Send Pending Emails
            </button>
            <button
              onClick={triggerCheckBacklinks}
              disabled={checkingBacklinks}
              className="btn btn-secondary"
            >
              {checkingBacklinks ? (
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              ) : (
                <LinkIcon className="w-4 h-4 mr-2" />
              )}
              Check Backlinks
            </button>
            <Link href="/admin/outreach/campaigns" className="btn btn-ghost">
              View Campaigns
            </Link>
            <Link href="/admin/outreach/queue" className="btn btn-ghost">
              View Queue
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="card p-6">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Recent Activity</h2>
          {recentEmails.length === 0 ? (
            <p className="text-neutral-500">No emails sent yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Operator</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Email</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-neutral-500">Sent At</th>
                  </tr>
                </thead>
                <tbody>
                  {recentEmails.map((email) => (
                    <tr key={email.id} className="border-b border-neutral-100">
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">
                        {email.operator_name}
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {email.operator_email}
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(email.status)}`}>
                          {getStatusIcon(email.status)}
                          {email.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-500">
                        {new Date(email.initial_sent_at).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
