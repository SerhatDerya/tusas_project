import { PanelMenu } from 'primereact/panelmenu';
import React, { useState } from 'react';
import AdminPanelContent from './AdminPanelContent';

function AdminPanel({ toast, ucakTipleriTable, musteriler, musterilerTable, lokasyonlarTable }){

  const [contentType, setContentType] = useState(0);
  
  const items = [
    {
        label: 'Uçak/Uçuş',
        icon: 'pi pi-send',
        items: [
            {
                label: 'Uçak Türü Ekle/Sil',
                icon: 'pi pi-plus',
                command: () => {
                   setContentType(1);
                }
            }
        ]
    },
    {
        label: 'Müşteri',
        icon: 'pi pi-user',
        items: [
            {
                label: 'Müşteri Ekle/Sil',
                icon: 'pi pi-plus',
                command: () => {
                  setContentType(2);
                }
            }
        ]
    },
    {
      label: 'Lokasyon',
      icon: 'pi pi-map-marker',
      items: [
          {
              label: 'Lokasyon Ekle/Sil',
              icon: 'pi pi-plus',
              command: () => {
                setContentType(3);
              }
          }
      ]
  },
    {
        label: 'Sign Out',
        icon: 'pi pi-sign-out',
        command: () => {
            
        }
    }
];


return (
    <div className="card flex justify-content-center adminPanel">
        <PanelMenu model={items} className="adminPanelMenu" />
        <AdminPanelContent contentType={contentType} toast={toast} ucakTipleriTable={ucakTipleriTable} musterilerTable={musterilerTable} lokasyonlarTable={lokasyonlarTable}/>
    </div>
)
}

export default AdminPanel;
