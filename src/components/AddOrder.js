import { useState } from "react";
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';

function AddOrder({ onCreate }){
    const [ucak, setUcak] = useState("");
    const [musteri, setMusteri] = useState("");

    const op = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        onCreate(ucak,musteri);
        setUcak('');
        setMusteri('');
    }

    return <div>
        <Button type="button" icon="pi pi-plus" label="Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <InputText placeholder="Uçak" value={ucak} onChange={(e) => setUcak(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Müşteri" value={musteri} onChange={(e) => setMusteri(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">www</span>
                        <InputText placeholder="Website" />
                    </div>

                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit}/>
                </div>
            </OverlayPanel>
    </div>
}

export default AddOrder;
