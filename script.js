// Enhanced leaderboard data with realistic users and metrics
const leaderboardData = [
    { rank: 1, username: "@loud_pioneer", displayName: "Loud Pioneer 🚀", followers: "45.2K", mindshare: "15.8%", change: "+2.1%", earnings: "3.42 SOL", avatar: "LP" },
    { rank: 2, username: "@crypto_whale", displayName: "Crypto Whale 🐋", followers: "128K", mindshare: "12.4%", change: "+1.8%", earnings: "2.89 SOL", avatar: "CW" },
    { rank: 3, username: "@defi_legend", displayName: "DeFi Legend ⚡", followers: "67.3K", mindshare: "9.7%", change: "+0.9%", earnings: "2.21 SOL", avatar: "DL" },
    { rank: 4, username: "@sol_enthusiast", displayName: "Sol Enthusiast ☀️", followers: "89.1K", mindshare: "8.2%", change: "+1.2%", earnings: "1.94 SOL", avatar: "SE" },
    { rank: 5, username: "@moon_caller", displayName: "Moon Caller 🌙", followers: "34.7K", mindshare: "7.5%", change: "+0.6%", earnings: "1.67 SOL", avatar: "MC" },
    { rank: 6, username: "@volume_king", displayName: "Volume King 👑", followers: "52.8K", mindshare: "6.8%", change: "+1.4%", earnings: "1.45 SOL", avatar: "VK" },
    { rank: 7, username: "@kaito_fan", displayName: "Kaito Fan 🤖", followers: "29.3K", mindshare: "5.9%", change: "+0.8%", earnings: "1.28 SOL", avatar: "KF" },
    { rank: 8, username: "@alpha_hunter", displayName: "Alpha Hunter 🎯", followers: "41.6K", mindshare: "5.4%", change: "+0.5%", earnings: "1.12 SOL", avatar: "AH" },
    { rank: 9, username: "@loud_advocate", displayName: "Loud Advocate 📢", followers: "18.9K", mindshare: "4.8%", change: "+0.3%", earnings: "0.98 SOL", avatar: "LA" },
    { rank: 10, username: "@social_master", displayName: "Social Master 📱", followers: "36.2K", mindshare: "4.2%", change: "+0.7%", earnings: "0.87 SOL", avatar: "SM" },
    { rank: 11, username: "@engagement_pro", displayName: "Engagement Pro 💪", followers: "25.7K", mindshare: "3.9%", change: "+0.4%", earnings: "0.76 SOL", avatar: "EP" },
    { rank: 12, username: "@twitter_legend", displayName: "Twitter Legend ⭐", followers: "71.4K", mindshare: "3.6%", change: "+0.2%", earnings: "0.68 SOL", avatar: "TL" },
    { rank: 13, username: "@meme_lord", displayName: "Meme Lord 😂", followers: "43.8K", mindshare: "3.2%", change: "+0.6%", earnings: "0.59 SOL", avatar: "ML" },
    { rank: 14, username: "@trend_setter", displayName: "Trend Setter 🔥", followers: "31.5K", mindshare: "2.9%", change: "+0.1%", earnings: "0.52 SOL", avatar: "TS" },
    { rank: 15, username: "@loud_believer", displayName: "Loud Believer 🙏", followers: "22.1K", mindshare: "2.7%", change: "+0.3%", earnings: "0.47 SOL", avatar: "LB" }
];

// Search functionality
let filteredData = [...leaderboardData];

// Countdown timer functionality
function startCountdown() {
    const targetDate = new Date('June 4, 2025 00:00:00 UTC').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            // Countdown finished
            document.getElementById('days').textContent = '0';
            document.getElementById('hours').textContent = '0';
            document.getElementById('minutes').textContent = '0';
            document.getElementById('seconds').textContent = '0';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Simple hash function for deterministic allocation
function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
}

// Generate deterministic allocation based on wallet address
function generateAllocation(walletAddress) {
    const hash = simpleHash(walletAddress.toLowerCase());
    
    // Generate allocation between 50 and 5000 tokens
    const minAllocation = 50;
    const maxAllocation = 5000;
    const allocation = minAllocation + (hash % (maxAllocation - minAllocation + 1));
    
    // Add some decimal places for realism
    const decimalVariation = (hash % 100) / 100; // 0.00 to 0.99
    return Math.floor(allocation + decimalVariation);
}

// Validate Solana wallet address (basic validation)
function isValidSolanaAddress(address) {
    // Basic Solana address validation
    // Solana addresses are base58 encoded and typically 32-44 characters
    const base58Regex = /^[1-9A-HJ-NP-Za-km-z]{32,44}$/;
    return base58Regex.test(address) && address.length >= 32 && address.length <= 44;
}

// Handle allocation check
function checkAllocation() {
    const walletInput = document.getElementById('wallet-address');
    const allocationResult = document.getElementById('allocation-result');
    const allocationError = document.getElementById('allocation-error');
    const walletAddress = walletInput.value.trim();
    
    // Hide previous results
    allocationResult.classList.add('hidden');
    allocationError.classList.add('hidden');
    
    if (!walletAddress) {
        allocationError.classList.remove('hidden');
        return;
    }
    
    if (!isValidSolanaAddress(walletAddress)) {
        allocationError.classList.remove('hidden');
        return;
    }
    
    // Generate deterministic allocation
    const allocation = generateAllocation(walletAddress);
    
    // Update the result display
    document.getElementById('allocation-amount').textContent = allocation.toLocaleString();
    document.getElementById('checked-address').textContent = walletAddress;
    
    // Show the result
    allocationResult.classList.remove('hidden');
    
    // Update eligible count (simulate)
    const currentCount = parseInt(document.getElementById('eligible-count').textContent.replace(',', ''));
    document.getElementById('eligible-count').textContent = (currentCount + 1).toLocaleString();
    
    // Smooth scroll to result
    setTimeout(() => {
        allocationResult.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
}

function filterLeaderboard(searchTerm) {
    if (!searchTerm) {
        filteredData = [...leaderboardData];
    } else {
        filteredData = leaderboardData.filter(user => 
            user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.displayName.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }
    populateLeaderboard();
}

// Create user avatar element
function createAvatar(user) {
    const avatar = document.createElement('div');
    avatar.className = 'user-avatar';
    avatar.textContent = user.avatar;
    return avatar;
}

// Format numbers for display
function formatNumber(num) {
    if (num.includes('K')) return num;
    const number = parseFloat(num);
    if (number >= 1000) {
        return (number / 1000).toFixed(1) + 'K';
    }
    return num;
}

// Get change color class
function getChangeColor(change) {
    const value = parseFloat(change);
    if (value > 0) return 'text-green-400';
    if (value < 0) return 'text-red-400';
    return 'text-gray-400';
}

// Get change icon
function getChangeIcon(change) {
    const value = parseFloat(change);
    if (value > 0) {
        return `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 17l9.2-9.2M17 17V7H7"></path>
                </svg>`;
    }
    if (value < 0) {
        return `<svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 7l-9.2 9.2M7 7v10h10"></path>
                </svg>`;
    }
    return '';
}

// Populate leaderboard table
function populateLeaderboard() {
    const tbody = document.getElementById('leaderboard-body');
    if (!tbody) return;

    tbody.innerHTML = '';

    filteredData.forEach(user => {
        const row = document.createElement('tr');
        row.className = 'border-b border-gray-800/50 hover:bg-gray-800/30 transition-all duration-200';

        const rankColor = user.rank <= 3 ? 'text-green-400' : 'text-gray-400';
        const changeColor = getChangeColor(user.change);
        const changeIcon = getChangeIcon(user.change);

        row.innerHTML = `
            <td class="p-2 align-middle py-4">
                <div class="flex items-center gap-2">
                    <span class="font-bold text-lg ${rankColor}">${user.rank}</span>
                </div>
            </td>
            <td class="p-2 align-middle py-4">
                <div class="flex items-center gap-3">
                    <div class="user-avatar">${user.avatar}</div>
                    <div class="flex-1">
                        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                            <a href="https://twitter.com/${user.username.substring(1)}" target="_blank" rel="noopener noreferrer" 
                               class="hover:text-green-400 font-bold text-base transition-colors max-w-[180px] sm:max-w-[220px] truncate text-white" 
                               title="${user.displayName}">
                                ${user.displayName}
                            </a>
                            <div class="flex items-center gap-3 text-sm">
                                <div class="flex items-center gap-1 text-gray-500">
                                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.196-2.121M9 12a3 3 0 106 0 3 3 0 00-6 0zm4 9v-4a6 6 0 00-6-6H4a6 6 0 00-6 6v4h12z"></path>
                                    </svg>
                                    <span>${user.followers}</span>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-2 mt-1">
                            <span class="text-sm text-gray-500">${user.username}</span>
                            <div class="sm:hidden flex items-center gap-1 text-xs">
                                <span class="font-medium ${changeColor}">${user.mindshare}</span>
                                <div class="flex items-center gap-0.5 ${changeColor}">
                                    ${changeIcon}
                                    <span class="font-medium">${user.change}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td class="p-2 align-middle text-right hidden sm:table-cell py-4">
                <div class="font-bold text-lg text-white">${user.mindshare}</div>
            </td>
            <td class="p-2 align-middle text-right hidden sm:table-cell py-4">
                <div class="flex items-center justify-end gap-1 font-bold ${changeColor}">
                    ${changeIcon}
                    <span>${user.change}</span>
                </div>
            </td>
            <td class="p-2 align-middle text-right py-4">
                <div class="space-y-1">
                    <div class="text-green-400 font-bold text-base">${user.earnings}</div>
                    <div class="text-gray-500 text-sm">$${(parseFloat(user.earnings) * 180).toFixed(0)}</div>
                </div>
            </td>
        `;

        tbody.appendChild(row);
    });
}

// Animate progress bars
function animateProgressBars() {
    // Animate fee split bars
    const feeBars = [
        { element: document.querySelector('.fee-split-fill-mindshare'), width: '72%' },
        { element: document.querySelector('.fee-split-fill-skaito'), width: '18%' },
        { element: document.querySelector('.fee-split-fill-creator'), width: '10%' }
    ];
    
    feeBars.forEach(bar => {
        if (bar.element) {
            bar.element.style.width = '0%';
            setTimeout(() => {
                bar.element.style.width = bar.width;
            }, 100);
        }
    });
}

// Animate fee percentages with updated values
function animatePercentages() {
    const percentageData = [
        { element: document.querySelectorAll('.fee-percentage')[0], value: 72 },
        { element: document.querySelectorAll('.fee-percentage')[1], value: 18 },
        { element: document.querySelectorAll('.fee-percentage')[2], value: 10 }
    ];
    
    percentageData.forEach(({ element, value }) => {
        if (!element) return;
        let currentValue = 0;
        const increment = value / 50;
        
        const timer = setInterval(() => {
            currentValue += increment;
            if (currentValue >= value) {
                currentValue = value;
                clearInterval(timer);
            }
            element.textContent = Math.floor(currentValue) + '%';
        }, 20);
    });
}

// Button event handlers
function handleRegisterClick() {
    window.open('https://yaps.kaito.ai/user', '_blank');
}

function handleFollowClick() {
    window.open('https://twitter.com/stayloudio', '_blank');
}

// Search input handler
function setupSearch() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterLeaderboard(e.target.value);
        });
    }
}

// Setup allocation checker
function setupAllocationChecker() {
    const checkButton = document.getElementById('check-allocation');
    const walletInput = document.getElementById('wallet-address');
    
    if (checkButton) {
        checkButton.addEventListener('click', checkAllocation);
    }
    
    if (walletInput) {
        walletInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                checkAllocation();
            }
        });
        
        // Clear results when input changes
        walletInput.addEventListener('input', () => {
            document.getElementById('allocation-result').classList.add('hidden');
            document.getElementById('allocation-error').classList.add('hidden');
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown timer
    startCountdown();
    
    // Setup allocation checker
    setupAllocationChecker();
    
    // Populate leaderboard
    populateLeaderboard();
    
    // Setup search functionality
    setupSearch();
    
    // Add button event listeners
    const registerBtns = document.querySelectorAll('.register-btn');
    const followBtns = document.querySelectorAll('.follow-btn');
    
    registerBtns.forEach(btn => {
        btn.addEventListener('click', handleRegisterClick);
    });
    
    followBtns.forEach(btn => {
        btn.addEventListener('click', handleFollowClick);
    });
    
    // Animate elements after a short delay
    setTimeout(() => {
        animateProgressBars();
        animatePercentages();
    }, 500);
    
    // Add hover effects to external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
        });
        
        link.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add placeholder animation
    const walletInput = document.getElementById('wallet-address');
    if (walletInput) {
        const placeholders = [
            'Enter your Solana wallet address...',
            'e.g., 7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU...',
            'Paste your wallet address here...'
        ];
        let currentPlaceholder = 0;
        
        setInterval(() => {
            if (document.activeElement !== walletInput && !walletInput.value) {
                currentPlaceholder = (currentPlaceholder + 1) % placeholders.length;
                walletInput.placeholder = placeholders[currentPlaceholder];
            }
        }, 3000);
    }
});

// Simulate real-time updates for eligible count
function simulateEligibleUpdates() {
    setInterval(() => {
        const eligibleElement = document.getElementById('eligible-count');
        if (eligibleElement) {
            const currentCount = parseInt(eligibleElement.textContent.replace(/,/g, ''));
            const increment = Math.floor(Math.random() * 3) + 1; // 1-3 new addresses
            const newCount = currentCount + increment;
            eligibleElement.textContent = newCount.toLocaleString();
        }
    }, 45000); // Update every 45 seconds
}

// Start eligible count updates
setTimeout(simulateEligibleUpdates, 5000); 