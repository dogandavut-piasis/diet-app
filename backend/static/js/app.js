var app = angular.module('dietitianApp', []);

app.controller('HomeController', function($scope, $http, $location) {
    var vm = this;
    
    // API Base URL
    var apiBaseUrl = '/api';
    
    // Hero Slides
    vm.slides = [];
    
    // Latest Blog Posts
    vm.latestBlogPosts = [];
    vm.loadingBlog = false;
    
    // Latest Gallery Images
    vm.latestGalleryImages = [];
    vm.loadingGallery = false;
    
    // Latest Recipes
    vm.latestRecipes = [];
    vm.loadingRecipes = false;
    
    // BMI Calculator
    vm.bmiData = {
        height: null,
        weight: null
    };
    vm.bmiResult = null;
    
    // Scroll to section function
    vm.scrollTo = function(section) {
        var element = document.getElementById(section);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    // Calculate BMI
    vm.calculateBMI = function($event) {
        if ($event) {
            $event.preventDefault();
        }
        
        if (!vm.bmiData.height || !vm.bmiData.weight) {
            return;
        }
        
        var heightInMeters = vm.bmiData.height / 100;
        var bmi = vm.bmiData.weight / (heightInMeters * heightInMeters);
        
        var category = '';
        var description = '';
        var idealMin = 18.5 * (heightInMeters * heightInMeters);
        var idealMax = 24.9 * (heightInMeters * heightInMeters);
        var difference = vm.bmiData.weight - ((idealMin + idealMax) / 2);
        
        if (bmi < 18.5) {
            category = 'Zayıf';
            description = 'İdeal kilonuzun altındasınız. Sağlıklı kilo alımı için uzman desteği alabilirsiniz.';
        } else if (bmi < 25) {
            category = 'Normal';
            description = 'Tebrikler! İdeal kilo aralığındasınız. Bu kiloyu korumaya devam edin.';
        } else if (bmi < 30) {
            category = 'Fazla Kilolu';
            description = 'İdeal kilonuzun üzerindesiniz. Sağlıklı kilo verme programı için uzman desteği alabilirsiniz.';
        } else {
            category = 'Obez';
            description = 'İdeal kilonuzun çok üzerindesiniz. Mutlaka bir uzman desteği almanızı öneriyoruz.';
        }
        
        // Calculate percentage for scale indicator (0-100 scale)
        var percentage = Math.min(100, Math.max(0, (bmi / 40) * 100));
        
        vm.bmiResult = {
            bmi: bmi,
            category: category,
            description: description,
            idealMin: idealMin,
            idealMax: idealMax,
            difference: difference,
            percentage: percentage
        };
        
        // Scroll to result
        setTimeout(function() {
            var bmiSection = document.getElementById('bmi');
            if (bmiSection) {
                bmiSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
        
        return false;
    };
    
    // Get BMI class for styling
    vm.getBMIClass = function() {
        if (!vm.bmiResult) return '';
        var bmi = vm.bmiResult.bmi;
        if (bmi < 18.5) return 'bmi-underweight';
        if (bmi < 25) return 'bmi-normal';
        if (bmi < 30) return 'bmi-overweight';
        return 'bmi-obese';
    };
    
    // Get BMI text class
    vm.getBMIClassText = function() {
        if (!vm.bmiResult) return '';
        var bmi = vm.bmiResult.bmi;
        if (bmi < 18.5) return 'text-info';
        if (bmi < 25) return 'text-success';
        if (bmi < 30) return 'text-warning';
        return 'text-danger';
    };
    
    // Helper function to normalize image URL
    vm.normalizeImageUrl = function(url) {
        if (!url) return url;
        // Eğer URL zaten mutlak yol ile başlıyorsa (http:// veya https:// ile), olduğu gibi döndür
        if (url.startsWith('http://') || url.startsWith('https://')) {
            return url;
        }
        // Eğer / ile başlıyorsa, olduğu gibi döndür
        if (url.startsWith('/')) {
            return url;
        }
        // Eğer pictures/ ile başlıyorsa (başında / yoksa), başına / ekle
        if (url.indexOf('pictures/') === 0 || url.indexOf('pictures\\') === 0) {
            return '/' + url.replace(/\\/g, '/');
        }
        // Değilse başına / ekle
        return '/' + url.replace(/\\/g, '/');
    };
    
    // Load Hero Slides
    vm.loadSlides = function() {
        $http.get(apiBaseUrl + '/HeroSlide')
            .then(function(response) {
                // Resim URL'lerini normalize et
                vm.slides = response.data.map(function(slide) {
                    if (slide.imageUrl) {
                        slide.imageUrl = vm.normalizeImageUrl(slide.imageUrl);
                    }
                    return slide;
                });
                if (vm.slides.length === 0) {
                    // Default slide if no data
                    vm.slides = [{
                        id: 0,
                        title: 'Sağlıklı Yaşam, Sağlıklı Gelecek',
                        description: 'Profesyonel diyetisyen ekibimizle size özel beslenme programları hazırlıyoruz. Sağlıklı yaşam yolculuğunuzda yanınızdayız.',
                        imageUrl: '/pictures/diyet.jpg',
                        buttonText: 'Randevu Al',
                        buttonLink: null
                    }];
                }
            })
            .catch(function(error) {
                console.error('Error loading slides:', error);
                // Default slide on error
                vm.slides = [{
                    id: 0,
                    title: 'Sağlıklı Yaşam, Sağlıklı Gelecek',
                    description: 'Profesyonel diyetisyen ekibimizle size özel beslenme programları hazırlıyoruz. Sağlıklı yaşam yolculuğunuzda yanınızdayız.',
                    imageUrl: '/pictures/diyet.jpg',
                    buttonText: 'Randevu Al',
                    buttonLink: null
                }];
            });
    };
    
    // Navbar scroll effect
    vm.initNavbar = function() {
        window.addEventListener('scroll', function() {
            var navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    };
    
    // Appointment Form Data
    vm.appointmentData = {
        fullName: '',
        phone: '',
        email: '',
        appointmentPreference: '',
        goal: '',
        message: ''
    };
    vm.submittingAppointment = false;
    
    // Submit Appointment Form
    vm.submitAppointmentForm = function($event) {
        if ($event) {
            $event.preventDefault();
        }
        
        // Form validation
        if (!vm.appointmentData.fullName || !vm.appointmentData.phone || !vm.appointmentData.email || 
            !vm.appointmentData.appointmentPreference || !vm.appointmentData.goal) {
            alert('Lütfen tüm zorunlu alanları doldurun!');
            return false;
        }
        
        vm.submittingAppointment = true;
        
        $http.post(apiBaseUrl + '/AppointmentRequest', vm.appointmentData)
            .then(function(response) {
                vm.submittingAppointment = false;
                alert('Randevu talebiniz başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
                // Formu temizle
                vm.appointmentData = {
                    fullName: '',
                    phone: '',
                    email: '',
                    appointmentPreference: '',
                    goal: '',
                    message: ''
                };
            })
            .catch(function(error) {
                console.error('Error submitting appointment:', error);
                vm.submittingAppointment = false;
                var errorMsg = error.data && error.data.message ? error.data.message : 'Randevu talebi gönderilirken hata oluştu!';
                alert('Hata: ' + errorMsg);
            });
        
        return false;
    };
    
    // Load Latest Blog Posts
    vm.loadLatestBlogPosts = function() {
        vm.loadingBlog = true;
        $http.get(apiBaseUrl + '/BlogPost/Latest/3')
            .then(function(response) {
                vm.latestBlogPosts = response.data.map(function(post) {
                    if (post.imageUrl) {
                        post.imageUrl = vm.normalizeImageUrl(post.imageUrl);
                    }
                    if (post.publishedDate) {
                        post.publishedDate = new Date(post.publishedDate);
                    }
                    return post;
                });
                vm.loadingBlog = false;
            })
            .catch(function(error) {
                console.error('Error loading latest blog posts:', error);
                vm.loadingBlog = false;
            });
    };
    
    // Load Latest Gallery Images
    vm.loadLatestGalleryImages = function() {
        vm.loadingGallery = true;
        $http.get(apiBaseUrl + '/GalleryImage/Latest/3')
            .then(function(response) {
                vm.latestGalleryImages = response.data.map(function(image) {
                    if (image.imageUrl) {
                        var originalUrl = image.imageUrl;
                        image.imageUrl = vm.normalizeImageUrl(image.imageUrl);
                        console.log('Gallery Image URL normalized:', originalUrl, '->', image.imageUrl);
                    }
                    return image;
                });
                vm.loadingGallery = false;
            })
            .catch(function(error) {
                console.error('Error loading latest gallery images:', error);
                vm.loadingGallery = false;
            });
    };
    
    // Go to gallery page
    vm.goToGallery = function() {
        window.location.href = 'gallery.html';
    };
    
    // Load Latest Recipes
    vm.loadLatestRecipes = function() {
        vm.loadingRecipes = true;
        $http.get(apiBaseUrl + '/Recipe/Latest/3')
            .then(function(response) {
                vm.latestRecipes = response.data.map(function(recipe) {
                    if (recipe.imageUrl) {
                        var originalUrl = recipe.imageUrl;
                        recipe.imageUrl = vm.normalizeImageUrl(recipe.imageUrl);
                        console.log('Recipe Image URL normalized:', originalUrl, '->', recipe.imageUrl);
                    }
                    return recipe;
                });
                vm.loadingRecipes = false;
            })
            .catch(function(error) {
                console.error('Error loading latest recipes:', error);
                vm.loadingRecipes = false;
            });
    };
    
    // Go to recipes page
    vm.goToRecipes = function() {
        window.location.href = 'recipes.html';
    };
    
    // Initialize
    vm.init = function() {
        vm.loadSlides();
        vm.loadLatestBlogPosts();
        vm.loadLatestGalleryImages();
        vm.loadLatestRecipes();
        vm.initNavbar();
    };
    
    vm.init();
});
