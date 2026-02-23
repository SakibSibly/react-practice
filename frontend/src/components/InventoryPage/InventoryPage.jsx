import { useAuth } from '../../context/AuthContext';

const InventoryPage = () => {
    const { user } = useAuth();

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-4">Inventory</h1>
            <p className="text-gray-600 mb-6">Welcome, {user?.firstName}! Here is your inventory.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {['Item A', 'Item B', 'Item C', 'Item D', 'Item E', 'Item F'].map((item) => (
                    <div key={item} className="border border-gray-200 rounded p-4 shadow-sm">
                        <h3 className="font-semibold text-lg">{item}</h3>
                        <p className="text-gray-500 text-sm mt-1">Qty: {Math.floor(Math.random() * 100) + 1}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default InventoryPage;
