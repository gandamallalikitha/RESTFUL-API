const apiUrl = 'http://localhost:3000/api/jobs';

// Fetch and display jobs with edit and delete options
if (document.getElementById('jobList')) {
  const jobList = document.getElementById('jobList');
  const premiumToggle = document.getElementById('premiumToggle');

  const fetchJobs = async () => {
    const isPremium = premiumToggle.checked;
    const response = await fetch(`${apiUrl}?premium=${isPremium}`);
    const jobs = await response.json();

    jobList.innerHTML = jobs.map(job => `
      <div class="job-card ${job.premiumOnly ? 'premium' : ''}">
        <h3>${job.title} - ${job.company}</h3>
        <p><strong>Package:</strong> ${job.package} LPA</p>
        <p><strong>Experience Required:</strong> ${job.experienceRequired}</p>
        <p>${job.description}</p>
        <p><strong>Job ID:</strong> ${job._id}</p>
        <button onclick="deleteJob('${job._id}')" class="btn danger">Delete</button>
        <button onclick="prefillUpdateForm('${job._id}')" class="btn warning">Edit</button>
      </div>
    `).join('');
  };

  premiumToggle.addEventListener('change', fetchJobs);
  fetchJobs();
}

// Delete a job
function deleteJob(jobId) {
  if (confirm('Are you sure you want to delete this job?')) {
    fetch(`${apiUrl}/${jobId}`, { method: 'DELETE' })
      .then(response => response.json())
      .then(data => {
        alert(data.message);
        location.reload();
      })
      .catch(err => console.error('Error deleting job:', err));
  }
}

// Prefill update form with job details
function prefillUpdateForm(jobId) {
  window.location.href = `update-job.html?jobId=${jobId}`;
}

// Update job functionality
const updateJobForm = document.getElementById('updateJobForm');
if (updateJobForm) {
  const urlParams = new URLSearchParams(window.location.search);
  const jobId = urlParams.get('jobId');

  if (jobId) {
    fetch(`${apiUrl}?premium=true`)
      .then(res => res.json())
      .then(jobs => {
        const job = jobs.find(j => j._id === jobId);
        if (job) {
          document.getElementById('jobId').value = job._id;
          document.getElementById('title').value = job.title;
          document.getElementById('company').value = job.company;
          document.getElementById('package').value = job.package;
          document.getElementById('experienceRequired').value = job.experienceRequired;
          document.getElementById('description').value = job.description;
          document.getElementById('premiumOnly').checked = job.premiumOnly;
        } else {
          alert('Job not found.');
        }
      });
  }

  updateJobForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const jobData = {
      title: document.getElementById('title').value,
      company: document.getElementById('company').value,
      package: parseInt(document.getElementById('package').value),
      experienceRequired: document.getElementById('experienceRequired').value,
      description: document.getElementById('description').value,
      premiumOnly: document.getElementById('premiumOnly').checked
    };

    fetch(`${apiUrl}/${document.getElementById('jobId').value}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(jobData)
    })
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          alert(data.message);
          window.location.href = 'jobs.html';
        } else {
          alert('Failed to update job.');
        }
      })
      .catch(err => console.error('Error updating job:', err));
  });
}