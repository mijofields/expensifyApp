import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        This will be the <strong>404 Error</strong> component
        Go <Link to="/">Home?</Link>
        {/* Link does clientside rendering */}
    </div>
);

export default NotFoundPage;