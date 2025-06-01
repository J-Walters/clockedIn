export default function LiveSearchForm() {
  return (
    <div class='container'>
      <form id='form'>
        <label for='radius'>Search Radius (miles):</label>
        <input
          type='number'
          id='radius'
          min='25'
          placeholder='25'
          name='distance'
        />

        <label for='keywords'>Keywords:</label>
        <input
          type='text'
          id='keywords'
          placeholder='e.g., Software Engineer'
          name='keywords'
        />

        <label for='time-filter'>Filter by Time:</label>
        <select id='time-filter' name='f_TPR'>
          <option value='r1800'>Past 30 Minutes</option>
          <option value='r3600'>Past Hour</option>
          <option value='r7200'>Past 2 Hours</option>
          <option value='r86400'>Past 24 Hours</option>
        </select>
        <p class='helper-text'>Select the time frame to filter job postings.</p>

        <label for='sort'>Sort By:</label>
        <select id='sort' name='sortBy'>
          <option value='R'>Relevance</option>
          <option selected value='DD'>
            Most Recent
          </option>
        </select>
        <p class='helper-text'>
          Select how you want the job listings to be sorted.
        </p>

        <button class='search-button' type='submit'>
          Go to LinkedIn
        </button>
      </form>
    </div>
  );
}
