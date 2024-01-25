import { useState } from "react";
import { Button } from 'primereact/button';
import React, { useRef } from 'react';
import { OverlayPanel } from 'primereact/overlaypanel';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';

function AddUcus({ onCreate, lokasyonlar }){
    const [ucakAdi, setUcakAdi] = useState("");
    const [kalkisYeri, setkalkisYeri] = useState("");
    const [inisYeri, setInisYeri] = useState("");
    const [kalkisSaati, setKalkisSaati] = useState("");
    const [inisSaati, setInisSaati] = useState("");
    

    const op = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        const ucusSuresi = Math.floor((new Date(inisSaati) - new Date(kalkisSaati)) / (60000 * 60)) + "sa " + Math.floor((new Date(inisSaati) - new Date(kalkisSaati)) / 60000)%60 + "dk";
        onCreate(ucakAdi,kalkisYeri,inisYeri,kalkisSaati,inisSaati,ucusSuresi);
        op.current.toggle(e);
        setUcakAdi('');
        setkalkisYeri('');
        setInisYeri('');
        setKalkisSaati('');
        setInisSaati('');
    }

    
    return <div>
        <Button type="button" icon="pi pi-plus" label="Uçuş Ekle" style={{marginBottom:'1rem'}} onClick={(e) => op.current.toggle(e)} />
            <OverlayPanel ref={op}>
                    <div className="card flex flex-column md:flex-row gap-3">
                      
                    {/* <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <InputText placeholder="Uçuş Id" value={ucakKodu} onChange={(e) => setUcakKodu(e.target.value)} />
                    </div> */}
                    
                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-send"></i>
                        </span>
                        <InputText placeholder="Uçak Adı" value={ucakAdi} onChange={(e) => setUcakAdi(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-map-marker"></i>
                        </span>
                        <Dropdown placeholder="Kalkış Yeri" value={kalkisYeri} options={lokasyonlar} onChange={(e) => setkalkisYeri(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon"><i className="pi pi-map-marker"></i></span>
                        <Dropdown placeholder="İniş Yeri" value={inisYeri} options={lokasyonlar} onChange={(e) => setInisYeri(e.target.value)} />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon"><i className="pi pi-calendar"></i></span>
                        <Calendar placeholder="Kalkış Saati" value={kalkisSaati} onChange={(e) => setKalkisSaati(e.target.value)} showTime hourFormat='24' dateFormat="dd/mm/yy" />
                    </div>

                    <div className="p-inputgroup flex-1" style={{marginBottom: '1rem'}}>
                        <span className="p-inputgroup-addon"><i className="pi pi-calendar"></i></span>
                        <Calendar placeholder="İniş Saati" value={inisSaati} onChange={(e) => setInisSaati(e.target.value)} showTime hourFormat='24' dateFormat="dd/mm/yy" />
                    </div>

                    <Button type='Button' icon="pi pi-save" label='Kaydet' onClick={handleSubmit} />
                </div>
            </OverlayPanel>
    </div>
}

export default AddUcus;
