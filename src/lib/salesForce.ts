// lib/salesforce.js
import jsforce from 'jsforce';

// Connection configuration
export const getSalesforceConnection = () => {
  const conn = new jsforce.Connection({
    // You can specify login URL if you're using a sandbox
    // loginUrl: 'https://test.salesforce.com'
  });
  
  return conn;
};

export const loginToSalesforce = async () => {
  const conn = getSalesforceConnection();
  
  try {
    await conn.login(
      process.env.SF_USERNAME,
      process.env.SF_PASSWORD + process.env.SF_SECRET_KEY
    );
    return conn;
  } catch (err) {
    console.error('Salesforce login error:', err);
    throw err;
  }
};