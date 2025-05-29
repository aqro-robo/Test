import React from 'react';
import { useParams } from 'react-router-dom';
import ChatWithMongo from './ChatWithMongo';

const ChatRouter = ({ currentUser }) => {
  const { partnerId } = useParams();

  return (
    <div>
      <ChatWithMongo userId={currentUser} partnerId={partnerId} />
    </div>
  );
};

export default ChatRouter;
