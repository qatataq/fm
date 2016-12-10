import React, { PropTypes } from 'react';

const Play = ({ isPlayed, ...props }) => (
  <div {...props}>
    <svg width="46px" height="47px" viewBox="0 0 46 47" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.2">
        <g transform="translate(-449.000000, -601.000000)" fill="#625FE2">
          <g transform="translate(447.000000, 599.000000)">
            <g id="playpauseIcon" transform="translate(0.000000, 2.000000)">
              <path id="play" opacity={isPlayed ? 0 : 1} d="M22.6074681,1.78506374 C23.1003999,0.799200261 23.8980263,0.796052514 24.3925319,1.78506374 L46.1074681,45.2149363 C46.6003999,46.2007997 46.1030811,47 44.995504,47 L2.00449605,47 C0.89744345,47 0.398026257,46.2039475 0.892531872,45.2149363 L22.6074681,1.78506374 Z" transform="translate(23.500000, 23.500000) rotate(90.000000) translate(-23.500000, -23.500000) "/>
              <path id="pause" opacity={isPlayed ? 1 : 0} d="M2,2.00449605 C2,0.89744345 2.88670635,0 3.99810135,0 L8.00189865,0 C9.10541955,0 10,0.896918893 10,2.00449605 L10,44.995504 C10,46.1025565 9.11329365,47 8.00189865,47 L3.99810135,47 C2.89458045,47 2,46.1030811 2,44.995504 L2,2.00449605 Z M34,2.00449605 C34,0.89744345 34.8867064,0 35.9981014,0 L40.0018986,0 C41.1054196,0 42,0.896918893 42,2.00449605 L42,44.995504 C42,46.1025565 41.1132936,47 40.0018986,47 L35.9981014,47 C34.8945804,47 34,46.1030811 34,44.995504 L34,2.00449605 Z" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
);

Play.propTypes = {
  isPlayed: PropTypes.func.isRequired,
};

const Mute = ({ isMuted, ...props }) => (
  <div {...props}>
    <svg width="51px" height="50px" viewBox="0 0 51 50" version="1.1">
      <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" opacity="0.2">
        <g transform="translate(-554.000000, -600.000000)">
          <g transform="translate(447.000000, 599.000000)">
            <g id="muteIcon" transform="translate(107.000000, 0.000000)">
              <path d="M11.5240841,32.3043478 L30.6537039,48.6162721 C31.4929049,49.3318631 32.1732118,49.0259648 32.1732118,47.9124579 L32.1732118,2.08383371 C32.1732118,0.979536844 31.4940022,0.663492811 30.6537039,1.38001948 L11.5197351,17.6956522 L2.00991534,17.6956522 C0.887633477,17.6956522 0,18.5913717 0,19.6962978 L0,30.3037022 C0,31.4124994 0.899869751,32.3043478 2.00991534,32.3043478 L11.5240841,32.3043478 Z" id="Combined-Shape" fill="#625FE2"/>
              <g id="mute" opacity={isMuted ? 1 : 0} transform="translate(39.000000, 19.999100)" stroke="#625FE2" strokeWidth="2" strokeLinecap="round">
                <path d="M0,0 L9.7989678,9.7989678"/>
                <path d="M0,0 L9.7989678,9.7989678" transform="translate(4.899484, 4.899484) scale(-1, 1) translate(-4.899484, -4.899484) "/>
              </g>
              <g id="unmute" opacity={isMuted ? 0 : 1} transform="translate(38.000000, 14.499100)" stroke="#625FE2" strokeWidth="2" strokeLinecap="round">
                <path d="M5.93162873,20.5519085 C9.00660073,18.2747401 11,14.6201617 11,10.5 C11,6.37983829 9.00660073,2.72525993 5.93162873,0.448091456"/>
                <path d="M0.931628726,16.5853844 C2.79320422,15.2067959 4,12.9943291 4,10.5 C4,8.00567092 2.79320422,5.79320411 0.931628726,4.41461561"/>
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </div>
);

Mute.propTypes = {
  isMuted: PropTypes.func.isRequired,
};

export {
  Play,
  Mute,
};