import React from 'react';
import { useEffect, useState } from "react";
import axios from 'axios';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';

function Ucuslar({ onDelete, onEdit }){
    const [ucuslar, setUcuslar] = useState([]);

    const fetchUcuslar = async () => {
        const response = await axios.get('http://localhost:3001/ucuslar');

        setUcuslar(response.data);
    };

    useEffect(() => {
        fetchUcuslar();
    }, []);

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


    return(
        <div className="card">
            <DataTable value={ucuslar} stripedRows editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete}  tableStyle={{ minWidth: '50rem' }}>
                <Column  field="id" header="Uçuş Id"></Column>
                <Column field="ucakAdi" header="Uçak Adı"  editor={(options) => textEditor(options)}></Column>
                <Column field="kalkisYeri" header="Kalkış Yeri" editor={(options) => dropdownEditor(options)}></Column>
                <Column field='inisYeri' header="İniş Yeri" editor={(options) => dropdownEditor(options)}></Column>
                <Column field='kalkisSaati' header="Kalkış Saati" editor={(options) => dateEditor(options)}></Column>
                <Column field='inisSaati' header="İniş Saati" editor={(options) => dateEditor(options)}></Column>
                <Column field='ucusSuresi' header="Uçuş Süresi" editor={(options) => textEditor(options)}></Column>
                <Column rowEditor headerStyle={{ width: '10%', minWidth: '8rem' }} bodyStyle={{ textAlign: 'center' }}></Column>
                <Column body={BodyTemplate}></Column>
            </DataTable>
        </div>
    )
}

export default Ucuslar;
