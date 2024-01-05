import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import React from 'react';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Dropdown } from 'primereact/dropdown';
import AddOrder from './AddOrder';


function Orders({ orders, onDelete, onEdit, onCreate }){

    /* const renderedOrders = orders.map((order) => {
        return <Order onEdit={onEdit} onDelete={onDelete} key={order.id} order={order} />
    }); */

    const textEditor = (options) => {
        return <InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} />;
    };

    const dateEditor = (options) => {
        
        return <Calendar value={new Date(options.value)} onChange={(e) => options.editorCallback(e.target.value.getDate()+"/"+(e.target.value.getMonth()+1)+"/"+e.target.value.getFullYear())} dateFormat="dd/mm/yy" />
    }

    const dropdownEditor = (options) => {
        
        return <Dropdown value={options.value} options={["Aksungur","Anka","Gökbey","Hürjet"]} onChange={(e) => options.editorCallback(e.target.value)} />
    }
    
    const onRowEditComplete = (e) => {
        onEdit(e);
    };
    
    const BodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => onDelete(rowData)} />
            </React.Fragment>
        );
    };


    return (
    <div className='card'>
        <AddOrder onCreate={onCreate} />
        <DataTable value={orders} stripedRows editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}  tableStyle={{ minWidth: '50rem' }}>
                <Column  field="id" header="Id"></Column>
                <Column field="ucakKodu" header="Uçak Adı"  editor={(options) => textEditor(options)}></Column>
                <Column field="ucak" header="Uçak Tipi"  editor={(options) => dropdownEditor(options)}></Column>
                <Column field="musteri" header="Müşteri" editor={(options) => textEditor(options)}></Column>
                <Column field='tarih' header="Üretim Tarihi" editor={(options) => dateEditor(options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
        </DataTable>
    </div>
    )

}

export default Orders;
