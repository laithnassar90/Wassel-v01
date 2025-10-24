import { useState } from 'react';
import { Search, Send } from 'lucide-react';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export function Messages() {
  const [selectedChat, setSelectedChat] = useState(conversations[0]);
  const [messageText, setMessageText] = useState('');

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1>Messages</h1>
        <p className="text-gray-600">Chat with your co-travelers</p>
      </div>

      <Card className="h-[calc(100vh-16rem)] flex">
        {/* Conversations List */}
        <div className="w-full md:w-80 border-r flex flex-col">
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input placeholder="Search messages..." className="pl-10" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {conversations.map((conversation) => (
              <button
                key={conversation.id}
                onClick={() => setSelectedChat(conversation)}
                className={`w-full p-4 border-b text-left hover:bg-gray-50 transition-colors ${
                  selectedChat.id === conversation.id ? 'bg-primary/5' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                    <span>{conversation.user.initials}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium truncate">{conversation.user.name}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                        {conversation.lastMessageTime}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                    <p className="text-xs text-gray-500 mt-1">{conversation.trip}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <Badge className="bg-primary text-primary-foreground flex-shrink-0">{conversation.unread}</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <span>{selectedChat.user.initials}</span>
              </div>
              <div>
                <p className="font-medium">{selectedChat.user.name}</p>
                <p className="text-sm text-gray-500">{selectedChat.trip}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {selectedChat.messages.map((message, idx) => (
              <div
                key={idx}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                    message.sent
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className={`text-xs mt-1 ${message.sent ? 'text-primary-foreground/70' : 'text-gray-500'}`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Type a message..."
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    setMessageText('');
                  }
                }}
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

const conversations = [
  {
    id: 1,
    user: {
      name: 'Ahmed Hassan',
      initials: 'AH'
    },
    trip: 'Dubai → Abu Dhabi',
    lastMessage: 'See you tomorrow at 8 AM!',
    lastMessageTime: '2m ago',
    unread: 1,
    messages: [
      { text: 'Hi! I booked 2 seats for tomorrow', sent: false, time: '10:23 AM' },
      { text: 'Great! Where would you like to be picked up?', sent: true, time: '10:25 AM' },
      { text: 'Near Dubai Mall would be perfect', sent: false, time: '10:26 AM' },
      { text: 'Perfect! I will be there at 8 AM sharp', sent: true, time: '10:28 AM' },
      { text: 'See you tomorrow at 8 AM!', sent: false, time: '10:30 AM' }
    ]
  },
  {
    id: 2,
    user: {
      name: 'Sarah Mohammed',
      initials: 'SM'
    },
    trip: 'Riyadh → Jeddah',
    lastMessage: 'Is the return trip on Sunday?',
    lastMessageTime: '1h ago',
    unread: 0,
    messages: [
      { text: 'Hi! I am interested in your Riyadh to Jeddah trip', sent: false, time: '9:15 AM' },
      { text: 'Hello! Yes, we leave on Friday at 6 AM', sent: true, time: '9:20 AM' },
      { text: 'Is the return trip on Sunday?', sent: false, time: '9:22 AM' }
    ]
  },
  {
    id: 3,
    user: {
      name: 'Omar Abdullah',
      initials: 'OA'
    },
    trip: 'Cairo → Alexandria',
    lastMessage: 'Thank you for the ride!',
    lastMessageTime: '2d ago',
    unread: 0,
    messages: [
      { text: 'Thank you for the ride!', sent: false, time: 'Sep 28' }
    ]
  }
];
