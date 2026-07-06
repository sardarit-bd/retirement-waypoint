export const ORDER_STATE = {
  PENDING: 'PENDING',
  COMPLETED: 'COMPLETED',
  FAILED: 'FAILED',
  CANCELLED: 'CANCELLED',
  REFUNDED: 'REFUNDED',
};

export const getOrderState = (order) => {
  if (!order) return null;
  
  if (order.orderStatus === 'CANCELLED') return ORDER_STATE.CANCELLED;
  if (order.paymentStatus === 'REFUNDED' || order.orderStatus === 'REFUNDED') return ORDER_STATE.REFUNDED;
  if (order.paymentStatus === 'FAILED') return ORDER_STATE.FAILED;
  if (order.paymentStatus === 'PAID' && order.orderStatus === 'COMPLETED') return ORDER_STATE.COMPLETED;
  if (order.paymentStatus === 'PENDING' || order.orderStatus === 'PENDING') return ORDER_STATE.PENDING;
  
  return ORDER_STATE.PENDING;
};

export const isOrderAccessible = (order) => {
  return order?.paymentStatus === 'PAID' && order?.orderStatus === 'COMPLETED';
};

export const getTimelineEvents = (order, purchases, invoice) => {
  const events = [];
  
  events.push({
    id: 'ORDER_CREATED',
    type: 'ORDER_CREATED',
    date: order?.createdAt,
    completed: true,
  });
  
  if (order?.paymentStatus === 'PAID' || order?.paymentStatus === 'REFUNDED') {
    events.push({
      id: 'PAYMENT_COMPLETED',
      type: 'PAYMENT_COMPLETED',
      date: order?.updatedAt,
      completed: true,
    });
  } else if (order?.paymentStatus === 'FAILED') {
    events.push({
      id: 'PAYMENT_FAILED',
      type: 'PAYMENT_FAILED',
      date: order?.updatedAt,
      completed: false,
    });
  } else {
    events.push({
      id: 'PAYMENT_PENDING',
      type: 'PAYMENT_PENDING',
      date: order?.createdAt,
      completed: false,
    });
  }
  
  if (purchases && purchases.length > 0 && order?.paymentStatus === 'PAID') {
    events.push({
      id: 'PURCHASE_ACTIVATED',
      type: 'PURCHASE_ACTIVATED',
      date: purchases[0]?.purchasedAt || order?.updatedAt,
      completed: true,
    });
  } else if (order?.paymentStatus !== 'PAID') {
    events.push({
      id: 'PURCHASE_ACTIVATED',
      type: 'PURCHASE_ACTIVATED',
      date: null,
      completed: false,
    });
  }
  
  if (invoice && order?.paymentStatus === 'PAID') {
    events.push({
      id: 'INVOICE_GENERATED',
      type: 'INVOICE_GENERATED',
      date: invoice?.createdAt || order?.updatedAt,
      completed: true,
    });
  } else if (order?.paymentStatus !== 'PAID') {
    events.push({
      id: 'INVOICE_GENERATED',
      type: 'INVOICE_GENERATED',
      date: null,
      completed: false,
    });
  }
  
  if (order?.orderStatus === 'CANCELLED') {
    events.push({
      id: 'ORDER_CANCELLED',
      type: 'ORDER_CANCELLED',
      date: order?.updatedAt,
      completed: true,
    });
  }
  
  return events;
};