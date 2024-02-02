const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())

const sql = require('mssql')
const config = {
  server: 'TAIYAPISALSQL1',  
  database: 'R1910_Test',
  user: "sa_r1910",
  password: "rTai05X*",
  options: {
    trustServerCertificate: true,
    trustedConnection: true,
  }
};


app.get('/musteriler', (re, res) => {
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query("SELECT * FROM SD_customers", function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.post('/musteriler', (req, res) => {
  const req_data = [req.body.id, req.body.musteriAdi]
  
  const query = `INSERT INTO SD_customers values (${req_data[0]},'${req_data[1]}')`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/musteriler/:id', (req, res) => {
  const req_data = [req.body.id, req.body.musteriAdi, req.params.id];
  
  const query = `UPDATE SD_customers SET id=${req_data[0]}, musteriAdi='${req_data[1]}' WHERE id=${req_data[2]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.delete('/musteriler/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const query = `DELETE FROM SD_customers WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/lokasyonlar', (req, res) => {
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query("SELECT * FROM SD_locations", function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.post('/lokasyonlar', (req, res) => {
  const req_data = [req.body.id, req.body.lokasyonAdi]
  
  const query = `INSERT INTO SD_locations values (${req_data[0]},'${req_data[1]}')`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/lokasyonlar/:id', (req, res) => {
  const req_data = [req.body.id, req.body.lokasyonAdi, req.params.id];
  
  const query = `UPDATE SD_locations SET id=${req_data[0]}, lokasyonAdi='${req_data[1]}' WHERE id=${req_data[2]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.delete('/lokasyonlar/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const query = `DELETE FROM SD_locations WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/ucakTipleri', (req, res) => {
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query("SELECT * FROM SD_planeTypes", function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/ucakTipleri/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakTipi, req.params.id];
  
  const query = `UPDATE SD_planeTypes SET id=${req_data[0]}, ucakTipi='${req_data[1]}' WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.post('/ucakTipleri', (req, res) => {
  const req_data = [req.body.id, req.body.ucakTipi]
  
  const query = `INSERT INTO SD_planeTypes values (${req_data[0]},'${req_data[1]}')`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.delete('/ucakTipleri/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const query = `DELETE FROM SD_planeTypes WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/orders', (req, res) => {
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query("SELECT * FROM SD_planes", function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/orders/ucakKodu/:ucakKodu', (req, res) => {
  const req_data = [req.params.ucakKodu]
  const query = `SELECT * FROM SD_planes WHERE ucakKodu='${req_data[0]}'`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.post('/orders', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi]
  
  const query = `INSERT INTO SD_planes values (${req_data[0]},'${req_data[1]}','${req_data[2]}','${req_data[3]}','${req_data[4]}','${req_data[5]}')`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, req_data, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/orders/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi, req.params.id];
  
  const query = `UPDATE SD_planes SET id=${req_data[0]}, ucakKodu='${req_data[1]}', ucak='${req_data[2]}', musteri='${req_data[3]}', tarih='${req_data[4]}', toplamUcusSuresi='${req_data[5]}' WHERE id=${req_data[6]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, req_data, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/orders/ucakKodu/:ucakKodu', (req, res) => {
  const req_data = [req.body.id, req.body.ucakKodu, req.body.ucak, req.body.musteri, req.body.tarih, req.body.toplamUcusSuresi, req.params.ucakKodu];
  
  const query = `UPDATE SD_planes SET id=${req_data[0]}, ucakKodu='${req_data[1]}', ucak='${req_data[2]}', musteri='${req_data[3]}', tarih='${req_data[4]}', toplamUcusSuresi='${req_data[5]}' WHERE ucakKodu='${req_data[6]}'`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.delete('/orders/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const query = `DELETE FROM SD_planes WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/ucuslar', (req, res) => {
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query("SELECT * FROM SD_flights", function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.get('/ucuslar/:id', (req, res) => {
  const req_data = [req.params.id];
  const query = `SELECT * FROM SD_flights WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.delete('/ucuslar/:id', (req, res) => {
  const req_data = [req.params.id]
  
  const query = `DELETE FROM SD_flights WHERE id=${req_data[0]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.put('/ucuslar/:id', (req, res) => {
  const req_data = [req.body.id, req.body.ucakAdi, req.body.kalkisYeri, req.body.inisYeri, req.body.kalkisSaati, req.body.inisSaati, req.body.ucusSuresi, req.params.id];
  
  const query = `UPDATE SD_flights SET id=${req_data[0]}, ucakAdi='${req_data[1]}', kalkisYeri='${req_data[2]}', inisYeri='${req_data[3]}', kalkisSaati='${req_data[4]}', inisSaati='${req_data[5]}', ucusSuresi='${req_data[6]}' WHERE id=${req_data[7]}`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.post('/ucuslar', (req, res) => {
  const req_data = [req.body.id, req.body.ucakAdi, req.body.kalkisYeri, req.body.inisYeri, req.body.kalkisSaati, req.body.inisSaati, req.body.ucusSuresi]
  
  const query = `INSERT INTO SD_flights values (${req_data[0]},'${req_data[1]}','${req_data[2]}','${req_data[3]}','${req_data[4]}','${req_data[5]}','${req_data[6]}')`;
  sql.connect(config, function(err) {
    if (err) return res.json(err.message);
    
    const request = new sql.Request();
    request.query(query, function(err, result) {
      if (err) return res.json(err.message);
      
      return res.json(result["recordsets"][0]);
      sql.close();
    });
  });
})

app.listen(5000, () => {
  console.log("listening");
})
