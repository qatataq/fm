import React, { PropTypes } from 'react'

const PlayPause = ({ isPlaying, ...props }) => (
  <div {...props}>
    <svg
      width="50"
      height="51"
      viewBox="0 0 50 57"
      xmlns="http://www.w3.org/2000/svg"
    >
      {isPlaying ?
        <path
          d="M2 4.004C2 2.897 2.887 2 3.998 2h4.004C9.105 2 10 2.897 10 4.004v42.992C10 48.103 9.113 49 8.002 49H3.998C2.895 49 2 48.103 2 46.996V4.004zm32 0C34 2.897 34.887 2 35.998 2h4.004C41.105 2 42 2.897 42 4.004v42.992C42 48.103 41.113 49 40.002 49h-4.004C34.895 49 34 48.103 34 46.996V4.004z"
          stroke="#918FEA"
          strokeWidth="3"
          fill="none"
          fillRule="evenodd"
          transform="translate(3 0)"
        />
        :
        <path
          d="M47.215 23.607c.986.493.99 1.29 0 1.786L3.785 47.107C2.8 47.6 2 47.103 2 45.997V3.003c0-1.107.796-1.606 1.785-1.11l43.43 21.713z"
          stroke="#918FEA"
          strokeWidth="3"
          fill="none"
          fillRule="evenodd"
          transform="translate(3,0)"
        />
      }
    </svg>
  </div>
)

PlayPause.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
}

const Next = ({ ...props }) => (
  <div {...props}>
    <svg
      width="36"
      height="51"
      viewBox="0 0 36 51"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.39 22.013l-7.025 3.573C2.61 25.97 2 25.59 2 24.726V3.007c0-.857.616-1.24 1.365-.86L10.39 5.72V3.006c0-.857.617-1.24 1.366-.86l21.68 11.027c.754.383.75 1.007 0 1.388l-21.68 11.026c-.754.383-1.365.004-1.365-.86v-2.713z"
        stroke="#918FEA"
        strokeWidth="3"
        fill="none"
        fillRule="evenodd"
        transform="translate(0 10)"
      />
    </svg>
  </div>
)

const Previous = ({ ...props }) => (
  <div {...props}>
    <svg
      width="36"
      height="51"
      viewBox="0 0 36 51"
      xmlns="http://www.w3.org/2000/svg"
    >
    <path
      d="M25.61 22.013l7.025 3.573c.754.383 1.365.004 1.365-.86V3.007c0-.857-.616-1.24-1.365-.86L25.61 5.72V3.006c0-.857-.617-1.24-1.366-.86L2.564 13.174c-.754.383-.75 1.007 0 1.388l21.68 11.026c.754.383 1.365.004 1.365-.86v-2.713z"
      stroke="#918FEA"
      strokeWidth="3"
      fill="none"
      fillRule="evenodd"
      transform="translate(0 10)"
    />
    </svg>
  </div>
)

const Sound = ({ onChange, reference, volume, ...props }) => (
  <div {...props}
    ref={reference}
  >
    <input
      type="range"
      defaultValue={volume}
      max="100"
      min="0"
      step="2"
      style={{
        position: 'absolute',
        top: '8px',
        left: '47px',
        opacity: 0,
        width: '92px'
      }}
      onChange={onChange}
    />
    <svg
      width="142"
      height="34"
      viewBox="0 0 142 34"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        fill="none"
        fillRule="evenodd"
      >
        <g transform="translate(50 12)">
          <rect fill="#DDDCF8" y="3" width="92" height="4" rx="2"/>
          <rect fill="#9F9DEC" y="3" width={Math.floor(volume / 100 * 92)} height="4" rx="2"/>
          <rect fill="#9F9DEC" x={Math.floor(volume / 100 * 82)} width="10" height="10" rx="5"/>
        </g>
        <g stroke="#918FEA">
          <path
            d="M9.439577 21.674783L21.20045 31.81395c.836375.721046 1.51439.4096 1.51439-.686944V2.87062c0-1.100434-.67656-1.409245-1.51439-.686943L9.436825 12.325217H3.99809c-1.10816 0-1.99809.89799-1.99809 2.005717v5.338132c0 1.10924.894576 2.005717 1.99809 2.005717h5.441487z"
            strokeWidth="3"
          />
          <g
            strokeWidth="2"
            strokeLinecap="round"
          >
            {volume < 1 && <path d="M27.235294 13.799424l6.34051 6.27134M33.575802 13.799424l-6.34051 6.27134"/>}
            {volume > 0 && <path d="M31.720466 23.432645C33.710153 21.97526 35 19.636328 35 16.999426c0-2.636904-1.289847-4.975835-3.279534-6.433222M28.485172 20.89407c1.204548-.882297 1.985416-2.298275 1.985416-3.894646 0-1.59637-.780868-3.01235-1.985416-3.894646"/>}
            }
          </g>
        </g>
      </g>
    </svg>
  </div>
)

export {
  PlayPause,
  Sound,
  Next,
  Previous,
}
