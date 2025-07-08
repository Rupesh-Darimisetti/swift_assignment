
const NameLogo = ({ name }) => {
    return (
        <div>
            <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-300 rounded-full">
                <span className="font-medium text-white-600">{name?.split(' ').map(each => each[0])}</span>
            </div>
        </div>
    )
}

export default NameLogo
