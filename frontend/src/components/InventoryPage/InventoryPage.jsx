import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'http://127.0.0.1:8000';

const InventoryPage = () => {
    const { user } = useAuth();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!user?.id) return;

        setLoading(true);
        setError('');

        fetch(`${API_BASE}/items/${user.id}`)
            .then(res => res.json())
            .then(data => {
                if (data.details) {
                    setError(data.details);
                } else {
                    setItems(Array.isArray(data) ? data : [data]);
                }
            })
            .catch(() => setError('Could not connect to the server.'))
            .finally(() => setLoading(false));
    }, [user?.id]);

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Inventory</h1>
            <p className="text-gray-600 mb-6">Welcome, {user?.username}! Here is your inventory.</p>

            {loading && <p className="text-gray-400">Loading...</p>}

            {!loading && error && (
                <p className="text-red-500">{error}</p>
            )}

            {!loading && !error && items.length === 0 && (
                <p className="text-gray-500">No items found in your inventory.</p>
            )}

            {!loading && items.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {items.map((item) => (
                        <div key={item.id} className="border border-gray-200 rounded p-4 shadow-sm">
                            <h2 className="text-xl font-semibold">{item.name}</h2>
                            <p className="text-gray-600 mt-1">Price: ${item.price.toLocaleString()}</p>
                            <span className={`mt-2 inline-block text-sm font-medium px-2 py-1 rounded ${
                                item.is_available
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-600'
                            }`}>
                                {item.is_available ? 'Available' : 'Not Available'}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default InventoryPage;
