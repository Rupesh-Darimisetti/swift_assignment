import { Link } from "react-router-dom"
import NameLogo from "../common/NameLogo"

const Header = (props) => {
    return (
        <div className="flex justify-between  p-3 align-middle  bg-blue-800 text-center pl-14 pr-14">
            <Link to="/" >
                <img src="https://cdn.prod.website-files.com/6509887b9119507025235a5a/650ada40fd6cf3427547c9d8_Swift%20logo.svg" alt="Swift logo" />
            </Link>
            <Link to="/profile">
                <div className="flex text-center gap-2 text-white justify-center items-center">
                    <NameLogo name={props?.name} />
                    {props.name}
                </div>
            </Link>
        </div>
    )
}

export default Header
