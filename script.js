document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("hireModal");
  const closeBtn = document.querySelector(".close-btn");
  const hireMeButtons = document.querySelectorAll("#btn-top");
  const sendMessageBtn = document.getElementById("submit-btn");

  hireMeButtons.forEach((button) => {
    if (button.textContent.trim() === "Hire me") {
      button.addEventListener("click", function (e) {
        e.preventDefault();
        modal.style.display = "block";
        document.body.style.overflow = "hidden";
      });
    }
  });

  closeBtn.addEventListener("click", function () {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  window.addEventListener("click", function (e) {
    if (e.target === modal) {
      modal.style.display = "none";
      document.body.style.overflow = "auto";
    }
  });

  sendMessageBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const nameInput = document.querySelector('input[placeholder="Enter your name"]');
    const emailInput = document.querySelector('input[placeholder="Enter your email address"]');
    const subjectInput = document.querySelector('input[placeholder="Enter your subject"]');
    const messageInput = document.querySelector("#message");

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const subject = subjectInput.value.trim();
    const message = messageInput.value.trim();

    if (!name || !email || !subject || !message) {
      showNotification("Please fill in all fields before sending the message.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    showSubmissionOptions(name, email, subject, message);
  });
});

function showSubmissionOptions(name, email, subject, message) {
  const optionsModal = document.createElement('div');
  optionsModal.className = 'submission-modal';
  optionsModal.innerHTML = `
    <div class="submission-modal-content">
      <h3>Choose how to send your message:</h3>
      <div class="submission-options">
        <button class="option-btn email-client-btn">
          <i class="fa-solid fa-envelope"></i>
          Open Email Client
          <small>Uses your default email app</small>
        </button>
        <button class="option-btn copy-details-btn">
          <i class="fa-solid fa-copy"></i>
          Copy Message Details
          <small>Copy to paste in your email</small>
        </button>
        <button class="option-btn gmail-btn">
          <i class="fa-brands fa-google"></i>
          Open Gmail
          <small>Opens Gmail in browser</small>
        </button>
        <button class="option-btn whatsapp-btn">
          <i class="fa-brands fa-whatsapp"></i>
          Send via WhatsApp
          <small>Message via WhatsApp</small>
        </button>
      </div>
      <button class="close-options-btn">Cancel</button>
    </div>
  `;

  document.body.appendChild(optionsModal);
  document.body.style.overflow = "hidden";

  const styles = `
    .submission-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10000;
    }
    .submission-modal-content {
      background: white;
      padding: 2rem;
      border-radius: 10px;
      max-width: 500px;
      width: 90%;
      text-align: center;
    }
    .submission-options {
      display: grid;
      gap: 1rem;
      margin: 1.5rem 0;
    }
    .option-btn {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 2px solid #e84949;
      background: white;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      text-align: left;
    }
    .option-btn:hover {
      background: #e84949;
      color: white;
    }
    .option-btn i {
      font-size: 1.5rem;
      width: 30px;
    }
    .option-btn small {
      display: block;
      opacity: 0.7;
      font-size: 0.8rem;
    }
    .close-options-btn {
      background: #666;
      color: white;
      border: none;
      padding: 0.5rem 1.5rem;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 1rem;
    }
  `;

  if (!document.getElementById('submission-modal-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'submission-modal-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  optionsModal.querySelector('.email-client-btn').addEventListener('click', function() {
    const mailtoLink = `mailto:mittalparag517@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoLink;
    setTimeout(() => {
      showNotification("If no email client opened, try another option below.", "info");
    }, 1000);
    closeSubmissionModal(optionsModal);
  });

  optionsModal.querySelector('.copy-details-btn').addEventListener('click', function() {
    const emailContent = `To: mittalparag517@gmail.com
Subject: ${subject}

Name: ${name}
Email: ${email}

Message:
${message}`;
    copyToClipboard(emailContent);
    showNotification("Message details copied! Paste in your email client.", "success");
    closeSubmissionModal(optionsModal);
  });

  optionsModal.querySelector('.gmail-btn').addEventListener('click', function() {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&to=mittalparag517@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.open(gmailUrl, '_blank');
    showNotification("Gmail opened in new tab!", "success");
    closeSubmissionModal(optionsModal);
  });

  optionsModal.querySelector('.whatsapp-btn').addEventListener('click', function() {
    const whatsappMessage = `Hi Parag! 

Name: ${name}
Email: ${email}
Subject: ${subject}

Message: ${message}`;
    const whatsappUrl = `https://wa.me/919024865220?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(whatsappUrl, '_blank');
    showNotification("WhatsApp opened in new tab!", "success");
    closeSubmissionModal(optionsModal);
  });

  optionsModal.querySelector('.close-options-btn').addEventListener('click', function() {
    closeSubmissionModal(optionsModal);
  });

  optionsModal.addEventListener('click', function(e) {
    if (e.target === optionsModal) {
      closeSubmissionModal(optionsModal);
    }
  });
}

function closeSubmissionModal(modal) {
  document.body.removeChild(modal);
  document.body.style.overflow = "auto";
  document.querySelector('input[placeholder="Enter your name"]').value = "";
  document.querySelector('input[placeholder="Enter your email address"]').value = "";
  document.querySelector('input[placeholder="Enter your subject"]').value = "";
  document.querySelector("#message").value = "";
}

function copyToClipboard(text) {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(function () {
      const btn = event.target;
      const originalText = btn.textContent;
      btn.textContent = "Copied!";
      btn.style.background = "#28a745";
      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = "#e84949";
      }, 2000);
    }).catch(function () {
      fallbackCopyHire(text);
      showNotification("Copied to clipboard!", "success");
    });
  } else {
    fallbackCopyHire(text);
    showNotification("Copied to clipboard!", "success");
  }
}

function fallbackCopyHire(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.select();
  document.execCommand("copy");
  document.body.removeChild(textArea);
}

function showNotification(message, type) {
  const existingNotification = document.querySelector('.notification');
  if (existingNotification) {
    existingNotification.remove();
  }

  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.textContent = message;

  const notificationStyles = `
    .notification {
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      z-index: 10001;
      animation: slideIn 0.3s ease;
    }
    .notification-success { background: #28a745; }
    .notification-error { background: #dc3545; }
    .notification-info { background: #17a2b8; }
    @keyframes slideIn {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;

  if (!document.getElementById('notification-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'notification-styles';
    styleSheet.textContent = notificationStyles;
    document.head.appendChild(styleSheet);
  }

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove();
    }
  }, 5000);
}
