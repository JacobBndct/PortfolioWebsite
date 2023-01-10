import React from "react";

export default class FIleUploadExample extends React.Component {

    state = {
        files: []
    };

    fileUpload = (e) => {
        this.setState({files: [...e.target.files]});
    };

    render() {
        return (
            <div>
                <span>File Upload</span>
                <input type="file" multiple="multiple" id="file" onChange={this.fileUpload}/>
                <ul>
                    {
                        this.state.files.map((file, i) => <li key={i}>{file.name}</li>)
                    }
                </ul>
            </div>
        );
    }
}