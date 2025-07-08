
const NameLogo = ({ name }) => {
    return (
        <div>
            <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-slate-200 rounded-full text-gray-600">
                <span className="font-medium text-white-600">{name?.split(' ').map(each => each[0])}</span>
            </div>
        </div>
    )
}

export default NameLogo
