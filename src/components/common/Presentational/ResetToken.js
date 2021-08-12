import React from 'react';
import Layout from '../../Layouts/Layout';
import { withRouter } from 'react-router-dom';

const ResetToken = () => {
   

    return (
    <Layout>
        <div className='container mt-5'>
            <h1 className="text-primary mb-3">Expired Token</h1>

        </div>
    </Layout>
    )
    
}

export default withRouter(ResetToken);
