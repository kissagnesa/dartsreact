import React, {useState, useEffect} from 'react';
import {Link, useParams} from 'react-router-dom';
import axios from 'axios';

export const DartsSingle=()=>{
    const params=useParams();
    const id = params.dartsId;
    const [darts, setdarts]=useState({});
    const [isPending, setPending]=useState(false);

    useEffect(()=>{
        (async()=>{
    try{
        const res=await axios.get('https://darts.sulla.hu/darts/' +id);
        setdarts(res.data);
    }
    catch(error){
        console.log("Hiba a lekérésben: ", error)
    }
    finally{
        setPending(false);
    }
})();
}, [id]);
return(
    <div className="container mt-5">
    <h2 className="text-center">Dartsozók</h2>
    {isPending ? (
        <div className="spinner-border"></div>
    ) : (
        <div className="row row-cols-1 row-cols-md-3 g-2">
                <div className="col">
                    <div className="card h-100">
                    <div className="text-dark text-center"><b>Dartsozó neve:<br /> {darts.name}</b></div>
                    <div className="text-danger text-center">Születési éve: {darts.birth_date}</div>
                    <div className="text-danger text-center">Megnyert világbajnokságai: {darts.world_ch_won}</div>
                    <div className="card-body d-flex flex-column align-items-center">
                        
                        <Link to={darts.profile_url} className="fs-6  btn btn-success" target="_blank">Profil link</Link><br/>
                       <Link key="x" to={"/darts/" + darts.id}>
                       <img src={darts.image_url ? darts.image_url : "https://via.placeholder.com/400x800"} 
                       alt={darts.name} className="img-fluid" style={{width: "200px"}} />
                       </Link><br/>
                    </div>
                    <div className="text-center">
                    <Link to={"/"}><i className="bi bi-backspace btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                    <Link to={"/" + darts.id}><i className="bi bi-pencil-square fs-6 btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                    <Link to={"/darts-del/" + darts.id}><i className="bi bi-trash3 fs-6 btn btn-danger"></i></Link>&nbsp;&nbsp;&nbsp;<br /><br />
                    </div>
                </div>
                </div>
                </div>                
    )}</div>
);
};