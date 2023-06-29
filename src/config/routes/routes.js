import Asks from "../../views/Ask";
import Best from "../../views/Best";
import Comments from "../../views/Comment";
import Home from "../../views/Home";
import Jobs from "../../views/Jobs";
import News from "../../views/News";
import Show from "../../views/Show";


export const routes = [
    {
        path: "/",
        element : <Home/>
    },
    {
        path: "/news",
        element : <News/>
    },
    {
        path: "/comments/:id",
        element : <Comments/>
    },
    {
        path: "/asks",
        element : <Asks/>
    },
    {
        path: "/best",
        element : <Best/>
    },
    {
        path: "/jobs",
        element : <Jobs/>
    },
    {
        path: "/shows",
        element : <Show/>
    },
]