import React, {useState, useEffect, useRef} from "react";
const Home = () => {
    const [songsList, setSongsList] = useState([])
	const playSong = useRef()

    const getSongsList = () => {
		fetch("https://playground.4geeks.com/sound/songs")
		.then((response) => response.json())
		.then((data) => setSongsList(data.songs))
	};

	const songActive = () => {
		console.log("me estas dando click");
	}


    useEffect(()=>{
        getSongsList()
    }, [])
	
	//para ver que propiedades tiene 
	const funcionEjm = () => {
		console.log(playSong)
	}

	// click..la cancion se escuche
	// boton la sgte cancion
	//efect sound
	//.current
	

	return (
		<div className="text-center">
			<h1 className="text-center mt-5">Hello Rigo!</h1>
            <label>Lista de canciones</label>
			{
				songsList.map((item,index)=>(
					<h5 key = {index} onClick = {() => songActive(item.url)}>{item.name}</h5>
				))
			}
			<audio src="" ref={playSong}></audio>
			<button onClick = {funcionEjm}></button>
		</div>
	);
};

export default Home;