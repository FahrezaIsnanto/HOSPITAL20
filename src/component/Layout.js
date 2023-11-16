import "./Layout.css"

export default function Layout({children}){
    return <div className="main">
        <div className="header">
                <h1 className="header-brand">HOSPITAL20</h1>
                <p className="header-version">versi sekarang 1.0.0</p>
        </div>   
        {children}
    </div>
}