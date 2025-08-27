import React from 'react';
import DashboardPages from './Components/Dashboard';
import Layout from './Components/Layout';

function App() {
  return (
    <div>
      <Layout>
        <DashboardPages />
      </Layout>
    </div>
  );
}

export default App;