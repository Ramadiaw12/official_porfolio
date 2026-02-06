// ==================== EMAILJS CONFIGURATION ====================
document.addEventListener('DOMContentLoaded', function() {
    // 1. Initialiser EmailJS UNE SEULE FOIS
    // REMPLACEZ 'VOTRE_PUBLIC_KEY' par votre vrai Public Key
    emailjs.init('ZiO9w7080Rjh5DQkh');
    
    // 2. Vos IDs EmailJS - IMPORTANT: REMPLACEZ CES VALEURS
    const EMAILJS_CONFIG = {
        SERVICE_ID: 'service_89wsb4a',  // Votre Service ID
        TEMPLATE_ID: 'template_0qtq1i6', // Votre Template ID
        YOUR_EMAIL: 'superrama86@gmail.com'
    };
    
    // 3. Récupérer les éléments du DOM
    const contactForm = document.getElementById('contact-form');
    
    // Vérifier si le formulaire existe
    if (!contactForm) {
        console.error('Formulaire non trouvé ! Vérifiez l\'ID "contact-form"');
        return;
    }
    
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn ? submitBtn.querySelector('.btn-text') : null;
    const btnLoader = submitBtn ? submitBtn.querySelector('.btn-loader') : null;
    const formAlert = document.getElementById('form-alert');
    
    // 4. Validation des champs
    function validateField(field) {
        const value = field.value.trim();
        const errorElement = document.getElementById(`${field.id}-error`);
        let isValid = true;
        let errorMessage = '';
        
        // Reset
        field.classList.remove('error', 'success');
        if (errorElement) {
            errorElement.classList.remove('show');
            errorElement.textContent = '';
        }
        
        // Validation basique
        if (field.hasAttribute('required') && value === '') {
            isValid = false;
            errorMessage = 'Ce champ est obligatoire';
        }
        
        // Validation email
        else if (field.type === 'email' && value !== '') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Veuillez entrer une adresse email valide';
            }
        }
        
        // Validation checkbox
        else if (field.type === 'checkbox' && !field.checked) {
            isValid = false;
            errorMessage = 'Vous devez accepter les conditions';
        }
        
        // Afficher le résultat
        if (!isValid) {
            field.classList.add('error');
            if (errorElement) {
                errorElement.textContent = errorMessage;
                errorElement.classList.add('show');
            }
        } else {
            field.classList.add('success');
        }
        
        return isValid;
    }
    
    // 5. Validation en temps réel
    const formFields = contactForm.querySelectorAll('.interior, #consent');
    formFields.forEach(field => {
        // Validation à la perte de focus
        if (field.type !== 'checkbox') {
            field.addEventListener('blur', () => validateField(field));
        }
        
        // Validation en temps réel pour les erreurs
        field.addEventListener('input', () => {
            if (field.classList.contains('error')) {
                validateField(field);
            }
        });
    });
    
    // 6. Validation de la checkbox
    const consentCheckbox = document.getElementById('consent');
    if (consentCheckbox) {
        consentCheckbox.addEventListener('change', () => validateField(consentCheckbox));
    }
    
    // 7. Afficher un message
    function showAlert(message, type = 'info', duration = 5000) {
        if (!formAlert) {
            // Si pas d'élément form-alert, utiliser alert classique
            alert(message);
            return;
        }
        
        formAlert.textContent = message;
        formAlert.className = `alert ${type}`;
        formAlert.style.display = 'block';
        
        // Animation d'entrée
        setTimeout(() => {
            formAlert.style.animation = 'slideDown 0.3s ease';
        }, 10);
        
        // Masquer après la durée
        if (duration > 0) {
            setTimeout(() => {
                formAlert.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => {
                    formAlert.style.display = 'none';
                }, 300);
            }, duration);
        }
    }
    
    // 8. Gestion de la soumission - VERSION SIMPLIFIÉE
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Valider tous les champs
        let isFormValid = true;
        formFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            showAlert('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }
        
        // Afficher le loader si présent
        if (submitBtn && btnText && btnLoader) {
            submitBtn.disabled = true;
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
        } else {
            // Fallback simple
            const originalText = submitBtn ? submitBtn.innerHTML : '';
            if (submitBtn) {
                submitBtn.innerHTML = 'Envoi en cours...';
                submitBtn.disabled = true;
            }
        }
        
        try {
            // Méthode 1: Utiliser sendForm (plus simple)
            const response = await emailjs.sendForm(
                EMAILJS_CONFIG.SERVICE_ID,
                EMAILJS_CONFIG.TEMPLATE_ID,
                this
            );
            
            console.log('✅ EmailJS Response:', response);
            
            if (response.status === 200) {
                // Succès
                showAlert('🎉 Message envoyé avec succès ! Je vous répondrai dans les plus brefs délais.', 'success');
                
                // Réinitialiser le formulaire
                contactForm.reset();
                
                // Réinitialiser les styles
                formFields.forEach(field => {
                    field.classList.remove('success', 'error');
                    const errorElement = document.getElementById(`${field.id}-error`);
                    if (errorElement) {
                        errorElement.classList.remove('show');
                        errorElement.textContent = '';
                    }
                });
            }
            
        } catch (error) {
            console.error('❌ EmailJS Error:', error);
            
            let errorMessage = 'Une erreur est survenue lors de l\'envoi. ';
            
            // Messages d'erreur spécifiques
            if (error.status === 400) {
                errorMessage = 'Configuration EmailJS incorrecte. Vérifiez vos Service ID et Template ID.';
            } else if (error.status === 401) {
                errorMessage = 'Clé API invalide. Vérifiez votre Public Key.';
            } else if (error.status === 429) {
                errorMessage = 'Trop de tentatives. Réessayez dans quelques minutes.';
            } else if (error.text) {
                errorMessage += `Détails: ${error.text}`;
            } else if (error.message) {
                errorMessage += `Erreur: ${error.message}`;
            }
            
            showAlert(errorMessage, 'error');
            
        } finally {
            // Réinitialiser le bouton
            if (submitBtn && btnText && btnLoader) {
                submitBtn.disabled = false;
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
            } else if (submitBtn) {
                submitBtn.innerHTML = 'Envoyer le message';
                submitBtn.disabled = false;
            }
        }
    });
    
    // 9. Protection anti-spam (optionnel)
    const honeypot = document.createElement('input');
    honeypot.type = 'text';
    honeypot.name = 'honeypot';
    honeypot.style.display = 'none';
    honeypot.style.position = 'absolute';
    honeypot.style.left = '-9999px';
    honeypot.setAttribute('aria-hidden', 'true');
    contactForm.appendChild(honeypot);
    
    contactForm.addEventListener('submit', function(e) {
        if (honeypot.value !== '') {
            e.preventDefault();
            showAlert('Détection de spam', 'error');
            return false;
        }
    });
    
    // 10. Test de configuration (dans la console)
    console.log('📧 EmailJS Configuration:');
    console.log('- Public Key:', '********' + (emailjs._user ? ' (définie)' : ' (non définie)'));
    console.log('- Service ID:', EMAILJS_CONFIG.SERVICE_ID);
    console.log('- Template ID:', EMAILJS_CONFIG.TEMPLATE_ID);
    console.log('- Formulaire:', contactForm ? 'Trouvé' : 'Non trouvé');
});