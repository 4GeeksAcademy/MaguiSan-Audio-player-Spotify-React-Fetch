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

	const pauseSong = () => {
		if (isPlaying) {
			playSong.current.pause();
		} else {
			playSong.current.play();
		}
	}

	// previousSong

    useEffect(()=>{
        getSongsList()
		if (playSong.current) {
			playSong.current.addEventListener("play", () => {
				setIsPlaying(true);
			})
			playSong.current.addEventListener("pause", () => {
				setIsPlaying(false);
			})
			return () => {
				playSong.current.removeEventListener("play", () => {
					setIsPlaying(true)
				})
				playSong.current.removeEventListener("pause", () => {
					setIsPlaying(false);
				})
			} 
		}
    }, [])
	
	// boton la sgte cancion
	//efect sound
	
	return (
		<div className="text-center">
            <label>Lista de canciones</label>
			{
				songsList.map((item,index)=>(
					<h5 key = {index} onClick = {() => getUrlSong(item.url)}>{item.name}</h5>
					// al dar click obtendre la url
				))
			}
			<audio src="" ref={playSong}></audio>
			<button >PREVIOUS</button>
			<button onClick = {pauseSong} ref={pausePlay}>{isPlaying ? 'play' : 'pause'}</button>
			<button >NEXT</button>
		</div>
	);
};
export default Home;