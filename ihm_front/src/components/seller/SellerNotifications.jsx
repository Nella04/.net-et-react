import React, { useState, useEffect, useRef } from 'react';
import { FaShoppingCart, FaMoneyBillWave, FaHeadset, FaEllipsisV } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import NotificationsIcon from "@mui/icons-material/Notifications"

const SellerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchNotifications = async () => {
      const notificationsData = [
        { id: 1, type: 'order', message: 'Nouvelle commande passée', timestamp: '2025-05-09 10:00', read: false },
        { id: 2, type: 'payment', message: 'Paiement effectué', timestamp: '2025-05-09 09:30', read: false },
        { id: 3, type: 'support', message: 'Demande de support ouverte', timestamp: '2025-05-09 09:15', read: true },
      ];
      setNotifications(notificationsData);
    };

    fetchNotifications();
  }, []);

  // Pour fermer le menu si clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDelete = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    toast.success("Notification supprimée !");
    setOpenMenuId(null);
  };

  const handleDisable = (notificationId) => {
    toast.info("Notifications de ce type désactivées !");
    setOpenMenuId(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  return (
    <div style={{ padding: '20px', backgroundColor: 'none' }}>
      <h2>
        <NotificationsIcon/> Notifications 
      </h2>
      <div>
        {notifications.map((notification) => (
          <div 
            key={notification.id}
            style={{
              position: 'relative',
              padding: '10px',
              backgroundColor: notification.read ? '#e1f7e7' : '#fff',
              borderRadius: '8px',
              marginBottom: '10px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              cursor: 'pointer',
            }}
          >
            {/* Partie gauche */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {notification.type === 'order' && <FaShoppingCart style={{ marginRight: '10px', color: notification.read ? 'gray' : 'blue' }} />}
              {notification.type === 'payment' && <FaMoneyBillWave style={{ marginRight: '10px', color: notification.read ? 'gray' : 'green' }} />}
              {notification.type === 'support' && <FaHeadset style={{ marginRight: '10px', color: notification.read ? 'gray' : 'purple' }} />}
              <div>
                <p style={{ margin: '0', fontWeight: 'bold' }}>{notification.message}</p>
                <small>{notification.timestamp}</small>
              </div>
            </div>

            {/* Trois points et menu */}
            <div style={{ position: 'relative' }} ref={menuRef}>
              <FaEllipsisV 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(notification.id);
                }}
                style={{ cursor: 'pointer' }}
              />
              {openMenuId === notification.id && (
                <div style={{
                  position: 'absolute',
                  top: '25px',
                  right: 0,
                  backgroundColor: '#fff',
                  border: '1px solid #ccc',
                  borderRadius: '5px',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                  zIndex: 1,
                  overflow: 'hidden',
                }}>
                  <button 
                    onClick={() => handleDelete(notification.id)}
                    style={{
                      padding: '10px',
                      width: '150px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Supprimer
                  </button>
                  <button 
                    onClick={() => handleDisable(notification.id)}
                    style={{
                      padding: '10px',
                      width: '150px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontSize: '14px',
                    }}
                  >
                    Désactiver ce type
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default SellerNotifications;