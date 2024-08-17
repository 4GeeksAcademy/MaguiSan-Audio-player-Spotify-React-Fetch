import React, {useState, useEffect, useRef} from "react";
const Home = () => {
    const [songsList, setSongsList] = useState([])
	const [urlSong, setUrlSong] = useState("")
	const [isPlaying, setIsPlaying] = useState(false)
	const playSong = useRef()
	const pausePlay = useRef()

    const getSongsList = () => {
		fetch("https://playground.4geeks.com/sound/songs")
		.then((response) => response.json())
		.then((data) => setSongsList(data.songs))
	};

	const getUrlSong = (url) => {
		setUrlSong(url)
		playSong.current.src= (`https://playground.4geeks.com${urlSong}`)
		playSong.current.play();
		// console.log("me estas dando click", urlSong)
	}

	//BOTON PLAY Y PAUSE CAMBIA AL DAR CLICK ----OK
	// const pauseSong = () => {
	// 	if (isPlaying) {
	// 		playSong.current.pause();
	// 	} else {
	// 		playSong.current.play()
	// 	}
	// 	setIsPlaying(!isPlaying)
	// }
	
	const pauseSong = () => {
		// console.log (pausePlay)
		if (isPlaying) {
			playSong.current.pause();
			pausePlay.current.innerHTML="PLAY"
		} else {
			playSong.current.play();
			pausePlay.current.innerHTML="PAUSE"
		}
		setIsPlaying(!isPlaying)
	}
	previousSong

    useEffect(()=>{
        getSongsList()
    }, [])
	
	// click..la cancion se escuche
	// boton la sgte cancion
	//efect sound
	//.current
	

	return (
		<div className="text-center">
            <label>Lista de canciones</label>
			{
				songsList.map((item,index)=>(
					<h5 key = {index} onClick = {() => getUrlSong(item.url)}>{item.name}</h5>
					// al dar click obtendre la url
				))
			}
			{/* al dar click voy a reproducir la musica */}
			<audio src="" ref={playSong}></audio>
			<button onClick={previousSong}>PREVIOUS</button>
			{/* <button onClick = {pauseSong}>{isPlaying ? 'Pause' : 'Play'}</button> */}
			<button onClick = {pauseSong} ref={pausePlay}>PAUSE</button>
			<button onClick={nextSong}>NEXT</button>
			
		</div>
	);
};
export default Home;