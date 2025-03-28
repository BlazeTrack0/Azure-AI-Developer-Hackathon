function WindMapIFrame() {
    return (
        <div className="w-full h-screen pt-[80px]">
            <iframe 
                title="Google" 
                src="https://windmap.z13.web.core.windows.net/"
                className="w-full h-full border-0" 
            />
        </div>
    );
}

export default WindMapIFrame;
