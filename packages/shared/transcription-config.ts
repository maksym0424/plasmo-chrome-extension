export default {
  ara: {
    new_line_delay_ms: 500,
    time_slice_ms: 1000,
    start_time_offset_threadshold: 100, // if start time differs less than this value, replace the word with new one.
    end_time_offset_threadshold: 100,
    overlap_offset_threadshold: 50,
    language_probability_threshold: 0.65,
    slices_per_processing: 6, // concat last chunks before send to websocket
  },
  azure: {
    new_line_delay_ms: 500,
    time_slice_ms: 10000,
  },
};
