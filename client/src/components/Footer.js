import { Component } from "react";

export default class Footer extends Component {
  render() {
    return (
      <div className="allfooter" style={{ paddingTop: "100px" }}>
        <div className="myFooter">
          <div className="sectionFooter">
            <h5>Visita nuestras redes sociales</h5>
            <ul style={{textAlign: "left"}}>
              <li>Lorem, ipsum dolor.</li>
              <li>Blanditiis, expedita totam!</li>
              <li>Ab, impedit voluptatibus.</li>
            </ul>
          </div>
          <div className="sectionFooter">
            <h5>Conócenos</h5>
            <ul style={{textAlign: "left"}}>
              <li>Lorem, ipsum dolor.</li>
              <li>Molestias, eos illum!</li>
              <li>Pariatur, atque alias.</li>
            </ul>
          </div>
          <div className="sectionFooter">
            <h5>Medios de atención al cliente</h5>
            <ul style={{textAlign: "left"}}>
              <li>Lorem, ipsum dolor.</li>
              <li>Quo, voluptate dolore.</li>
              <li>Unde, aspernatur amet!</li>
            </ul>
          </div>
        </div>
        <div className="subfoot">
          <p style={{ margin: "0", fontSize: "small" }}>Made by robcg1102</p>
        </div>
      </div>
    );
  }
}
