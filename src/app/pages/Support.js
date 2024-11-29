'use client';
import { useState } from 'react';
import { MessageCircle, CheckCircle, XCircle } from 'lucide-react';

export default function Support() {
  const [ticketSubject, setTicketSubject] = useState('');
  const [ticketDescription, setTicketDescription] = useState('');
  const [tickets, setTickets] = useState([
    {
      id: 1,
      subject: 'Issue with product delivery',
      description: 'The product I ordered hasn’t arrived yet.',
      status: 'open',
      response: 'Our team is looking into it.',
    },
    {
      id: 2,
      subject: 'Payment issue',
      description: 'My payment didn’t go through. Can you help?',
      status: 'resolved',
      response: 'Your payment was successfully processed.',
    },
  ]);

  const handleSubmitTicket = (e) => {
    e.preventDefault();
    const newTicket = {
      id: tickets.length + 1,
      subject: ticketSubject,
      description: ticketDescription,
      status: 'open',
      response: 'Your ticket is being reviewed.',
    };
    setTickets([newTicket, ...tickets]);
    setTicketSubject('');
    setTicketDescription('');
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 px-6 py-8">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Support</h1>

      {/* Ticket Submission Form */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 mb-8">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          <MessageCircle className="inline-block mr-2 w-6 h-6 text-blue-500" />
          Submit a Ticket
        </h2>
        <form onSubmit={handleSubmitTicket} className="space-y-4">
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Subject</label>
            <input
              type="text"
              value={ticketSubject}
              onChange={(e) => setTicketSubject(e.target.value)}
              placeholder="Enter ticket subject"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Description</label>
            <textarea
              value={ticketDescription}
              onChange={(e) => setTicketDescription(e.target.value)}
              placeholder="Describe your issue"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              rows="4"
              required
            />
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Submit Ticket
          </button>
        </form>
      </section>

      {/* Ticket History */}
      <section className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
          <CheckCircle className="inline-block mr-2 w-6 h-6 text-green-500" />
          Your Tickets
        </h2>
        <div className="space-y-4">
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className={`p-4 rounded-lg border ${ticket.status === 'open' ? 'border-blue-300' : 'border-green-300'} bg-white dark:bg-gray-800`}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{ticket.subject}</h3>
              <p className="text-gray-600 dark:text-gray-300 mt-2">{ticket.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span
                  className={`text-sm font-medium ${
                    ticket.status === 'open' ? 'text-blue-600' : 'text-green-600'
                  }`}
                >
                  {ticket.status === 'open' ? 'Open' : 'Resolved'}
                </span>
                {ticket.status === 'open' && (
                  <button
                    onClick={() => {
                      const updatedTickets = tickets.map((t) =>
                        t.id === ticket.id ? { ...t, status: 'resolved' } : t
                      );
                      setTickets(updatedTickets);
                    }}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
              {ticket.status === 'resolved' && (
                <div className="mt-4">
                  <p className="text-gray-800 dark:text-white font-medium">Support Response:</p>
                  <p className="text-gray-600 dark:text-gray-300">{ticket.response}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
