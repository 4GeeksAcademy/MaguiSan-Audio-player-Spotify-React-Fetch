import React, {useState, useEffect, useRef} from "react";
const Home = () => {
    const [songsList, setSongsList] = useState([]);
	const [isPlaying, setIsPlaying] = useState(false);
	const [songIndex, setSongIndex] = useState (null); // Estado para la canción en reproducción por defecto
	const refAudio = useRef();
    const getSongsList = () => {
		fetch("https://playground.4geeks.com/sound/songs")
		.then((response) => response.json())
		.then((data) => {setSongsList(data.songs);
			// console.log(data.songs);
		});
	};
	const getUrlSong = (url) => {
		console.log("soy la cancion:", url);
		refAudio.current.src= `https://playground.4geeks.com${url}`;
		refAudio.current.play();
	}
	const pausePlay = () => {
		if (isPlaying) {
			refAudio.current.pause();
		} else {
			refAudio.current.play();
		}
	}
	const previousSong = () => {
		setSongIndex((prevIndex) => {
			const newIndx = (prevIndex - 1 + songsList.length) % songsList.length;
			getUrlSong(songsList[newIndx]?.url); // Usa el nuevo índice para obtener la canción correcta
			return newIndx
		});
	};
	const nextSong = () => {
		setSongIndex((prevIndex) => {
		const newIndx= (prevIndex + 1) % songsList.length;
		getUrlSong(songsList[newIndx]?.url);
		return newIndx
		});
	};
    useEffect(()=>{
        getSongsList()
		if (refAudio.current) {
			refAudio.current.addEventListener("play", () => {
				setIsPlaying(true);
			})
			refAudio.current.addEventListener("pause", () => {
				setIsPlaying(false);
			})
			return () => {
				refAudio.current.removeEventListener("play", () => {
					setIsPlaying(true)
				})
				refAudio.current.removeEventListener("pause", () => {
					setIsPlaying(false);
				})
			} 
		}
    }, [])
	return (
		<div className="container-fluid p-0 w-100 bg-dark">
            <h3 className="bg-dark text-light fw-bold text-center p-2 sticky-top">Songs List</h3>
			<ol className="list-group mh-100 list-group-flush">
				{
					songsList.map((item, index) => (
						<li key={index} className={`list-group-item list-group-item-action list-group-item-dark text-black fs-3 ${songIndex === index && isPlaying ? "bg-white" : ""}`} onClick={() => {getUrlSong(item.url); setSongIndex(index);}}><span className="pe-5"><b>{item.id}</b></span>{item.name}</li>
					))
				}
			</ol>
			<audio src="" ref={refAudio}></audio>
			<div className="sticky-bottom bg-dark text-center p-2">
				<div className="row g-1">
					<div className="col-4 text-end pt-2">
						<button className="rounded border-0 px-2 m-2" onClick={previousSong}><i className="fa-solid fa-caret-left fa-lg"></i></button>
					</div>
					<div className="col-4">
						<button className="rounded border-0 p-2 m-2" onClick={pausePlay}>{isPlaying ? <i className="fa-solid fa-pause fa-xl px-1"></i> : <i className="fa-solid fa-play fa-2xl"></i>}</button>
					</div>
					<div className="col-4 text-start pt-2">
						<button className="rounded border-0 px-2 m-2" onClick={nextSong}><i className="fa-solid fa-caret-right fa-lg"></i></button>
					</div>
				</div>
			</div>
		</div>
	);
};
export default Home;