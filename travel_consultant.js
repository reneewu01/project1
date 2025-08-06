// 旅遊諮詢系統 JavaScript
class TravelConsultant {
    constructor() {
        this.form = document.getElementById('travelForm');
        this.loading = document.getElementById('loading');
        this.results = document.getElementById('results');
        this.init();
    }

    init() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmission();
        });

        // 設置預設日期為明天
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        document.getElementById('startDate').value = tomorrow.toISOString().split('T')[0];
    }

    handleFormSubmission() {
        const formData = new FormData(this.form);
        const travelData = this.parseFormData(formData);
        
        this.showLoading();
        
        // 模擬API調用延遲
        setTimeout(() => {
            this.generateTravelPlan(travelData);
            this.hideLoading();
        }, 2000);
    }

    parseFormData(formData) {
        const data = {};
        for (let [key, value] of formData.entries()) {
            if (key === 'interests') {
                if (!data[key]) data[key] = [];
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        return data;
    }

    showLoading() {
        this.loading.style.display = 'block';
        this.results.style.display = 'none';
    }

    hideLoading() {
        this.loading.style.display = 'none';
        this.results.style.display = 'block';
    }

    generateTravelPlan(data) {
        const plan = this.createTravelPlan(data);
        this.displayResults(plan);
    }

    createTravelPlan(data) {
        const destination = data.destination.toLowerCase();
        const duration = parseInt(data.duration);
        const budget = data.budget;
        const interests = data.interests || [];

        // 根據目的地生成不同的旅遊計劃
        let plan = {
            destination: data.destination,
            duration: duration,
            budget: budget,
            interests: interests,
            services: this.getServices(destination, budget),
            itinerary: this.generateItinerary(destination, duration, interests),
            recommendations: this.getRecommendations(destination, interests, budget)
        };

        return plan;
    }

    getServices(destination, budget) {
        const services = {
            travelAgency: [],
            hotels: [],
            carRental: [],
            guides: []
        };

        // 旅行社推薦
        services.travelAgency = [
            { name: "華航旅行社", rating: 4.8, price: "NT$ 15,000起", features: ["專業導遊", "全程保險", "機場接送"] },
            { name: "雄獅旅遊", rating: 4.6, price: "NT$ 12,000起", features: ["小團出發", "彈性行程", "中文導遊"] },
            { name: "可樂旅遊", rating: 4.7, price: "NT$ 18,000起", features: ["豪華住宿", "專車接送", "美食體驗"] }
        ];

        // 飯店推薦
        if (budget === 'economy') {
            services.hotels = [
                { name: "青年旅館", rating: 4.2, price: "NT$ 800/晚", features: ["免費WiFi", "公共廚房", "交誼廳"] },
                { name: "經濟型飯店", rating: 4.0, price: "NT$ 1,200/晚", features: ["基本設施", "清潔服務", "24小時櫃台"] }
            ];
        } else if (budget === 'standard') {
            services.hotels = [
                { name: "商務飯店", rating: 4.4, price: "NT$ 2,500/晚", features: ["健身房", "餐廳", "商務中心"] },
                { name: "度假飯店", rating: 4.5, price: "NT$ 3,000/晚", features: ["游泳池", "SPA", "景觀房"] }
            ];
        } else {
            services.hotels = [
                { name: "五星級飯店", rating: 4.8, price: "NT$ 8,000/晚", features: ["豪華設施", "私人管家", "米其林餐廳"] },
                { name: "精品度假村", rating: 4.9, price: "NT$ 12,000/晚", features: ["私人泳池", "專屬服務", "頂級SPA"] }
            ];
        }

        // 租車服務
        services.carRental = [
            { name: "和運租車", rating: 4.5, price: "NT$ 1,500/天", features: ["新車保證", "全險保障", "24小時救援"] },
            { name: "格上租車", rating: 4.4, price: "NT$ 1,300/天", features: ["多種車型", "異地還車", "GPS導航"] },
            { name: "中租租車", rating: 4.3, price: "NT$ 1,200/天", features: ["經濟實惠", "基本保險", "免費取車"] }
        ];

        // 導遊服務
        services.guides = [
            { name: "專業導遊 - 張小明", rating: 4.8, price: "NT$ 3,000/天", features: ["中文導遊", "歷史專業", "攝影技巧"] },
            { name: "當地導遊 - 李美麗", rating: 4.6, price: "NT$ 2,500/天", features: ["當地人脈", "美食推薦", "文化解說"] },
            { name: "私人導遊 - 王大山", rating: 4.9, price: "NT$ 5,000/天", features: ["VIP服務", "專車接送", "客製行程"] }
        ];

        return services;
    }

    generateItinerary(destination, duration, interests) {
        const itinerary = [];
        
        // 根據目的地生成行程
        if (destination.includes('雲南') || destination.includes('麗江')) {
            itinerary.push(...this.generateYunnanItinerary(duration, interests));
        } else if (destination.includes('日本') || destination.includes('東京')) {
            itinerary.push(...this.generateJapanItinerary(duration, interests));
        } else if (destination.includes('泰國') || destination.includes('曼谷')) {
            itinerary.push(...this.generateThailandItinerary(duration, interests));
        } else {
            itinerary.push(...this.generateGenericItinerary(destination, duration, interests));
        }

        return itinerary;
    }

    generateYunnanItinerary(duration, interests) {
        const itinerary = [];
        
        // 麗江古城行程
        itinerary.push({
            day: 1,
            title: "抵達麗江古城",
            activities: [
                "抵達麗江機場，專車接送至古城",
                "入住古城內特色客棧",
                "漫步四方街，感受納西文化",
                "晚餐品嚐納西族特色菜餚"
            ]
        });

        if (duration >= 3) {
            itinerary.push({
                day: 2,
                title: "玉龍雪山一日遊",
                activities: [
                    "前往玉龍雪山景區",
                    "搭乘纜車登上海拔4506米",
                    "欣賞冰川公園美景",
                    "參觀藍月谷",
                    "返回古城，自由活動"
                ]
            });
        }

        if (duration >= 5) {
            itinerary.push({
                day: 3,
                title: "瀘沽湖深度遊",
                activities: [
                    "前往瀘沽湖（車程約4小時）",
                    "乘船遊覽瀘沽湖",
                    "參觀摩梭族民俗村",
                    "體驗摩梭族文化",
                    "入住湖邊客棧"
                ]
            });

            itinerary.push({
                day: 4,
                title: "瀘沽湖環湖遊",
                activities: [
                    "環湖自駕或包車遊覽",
                    "參觀里格半島",
                    "體驗摩梭族走婚文化",
                    "品嚐當地特色美食",
                    "返回麗江古城"
                ]
            });
        }

        if (duration >= 7) {
            itinerary.push({
                day: 5,
                title: "香格里拉探險",
                activities: [
                    "前往香格里拉（車程約3小時）",
                    "參觀松贊林寺",
                    "遊覽普達措國家公園",
                    "體驗藏族文化",
                    "入住香格里拉飯店"
                ]
            });

            itinerary.push({
                day: 6,
                title: "香格里拉深度遊",
                activities: [
                    "參觀獨克宗古城",
                    "遊覽納帕海自然保護區",
                    "體驗藏族民俗活動",
                    "品嚐藏族特色美食",
                    "返回麗江"
                ]
            });
        }

        if (duration >= 10) {
            itinerary.push({
                day: 7,
                title: "大理古城遊覽",
                activities: [
                    "前往大理（車程約2小時）",
                    "遊覽大理古城",
                    "參觀崇聖寺三塔",
                    "漫步洱海邊",
                    "品嚐白族特色菜"
                ]
            });

            itinerary.push({
                day: 8,
                title: "洱海環湖遊",
                activities: [
                    "洱海環湖自駕",
                    "參觀雙廊古鎮",
                    "遊覽喜洲古鎮",
                    "體驗白族扎染工藝",
                    "返回麗江"
                ]
            });
        }

        // 最後一天
        itinerary.push({
            day: duration,
            title: "告別麗江",
            activities: [
                "古城最後漫步",
                "購買紀念品",
                "品嚐最後一頓納西美食",
                "專車送往機場",
                "結束美好旅程"
            ]
        });

        return itinerary;
    }

    generateJapanItinerary(duration, interests) {
        const itinerary = [];
        
        itinerary.push({
            day: 1,
            title: "抵達東京",
            activities: [
                "抵達東京成田機場",
                "搭乘機場快線前往市區",
                "入住飯店，稍作休息",
                "淺草寺參拜",
                "晚餐品嚐壽司"
            ]
        });

        if (duration >= 3) {
            itinerary.push({
                day: 2,
                title: "東京經典景點",
                activities: [
                    "明治神宮參拜",
                    "原宿竹下通購物",
                    "澀谷十字路口",
                    "新宿都廳展望台",
                    "新宿歌舞伎町夜遊"
                ]
            });
        }

        return itinerary;
    }

    generateThailandItinerary(duration, interests) {
        const itinerary = [];
        
        itinerary.push({
            day: 1,
            title: "抵達曼谷",
            activities: [
                "抵達曼谷素萬那普機場",
                "入住飯店",
                "大皇宮參觀",
                "臥佛寺參拜",
                "晚餐品嚐泰式料理"
            ]
        });

        return itinerary;
    }

    generateGenericItinerary(destination, duration, interests) {
        const itinerary = [];
        
        for (let day = 1; day <= duration; day++) {
            itinerary.push({
                day: day,
                title: `第${day}天 - ${destination}探索`,
                activities: [
                    "當地特色早餐",
                    "主要景點參觀",
                    "當地美食體驗",
                    "文化體驗活動",
                    "自由活動時間"
                ]
            });
        }

        return itinerary;
    }

    getRecommendations(destination, interests, budget) {
        const recommendations = {
            packing: [],
            tips: [],
            emergency: []
        };

        // 打包建議
        recommendations.packing = [
            "舒適的步行鞋",
            "防曬用品",
            "雨具（雨季）",
            "保暖衣物（高海拔地區）",
            "個人藥品",
            "相機和充電器"
        ];

        // 旅遊貼士
        recommendations.tips = [
            "提前預訂熱門景點門票",
            "準備現金和信用卡",
            "學習基本當地語言",
            "注意當地風俗習慣",
            "保持環境整潔"
        ];

        // 緊急聯絡
        recommendations.emergency = [
            "台灣駐外辦事處",
            "當地警察局",
            "醫院急診",
            "旅行社緊急聯絡",
            "保險公司聯絡"
        ];

        return recommendations;
    }

    displayResults(plan) {
        const resultsHTML = `
            <div class="success">
                <h2>🎉 您的專屬旅遊計劃已生成！</h2>
                <p>目的地：${plan.destination} | 天數：${plan.duration}天 | 預算：${plan.budget}</p>
            </div>

            <div class="service-card">
                <h3>🏢 推薦旅行社</h3>
                <ul class="service-list">
                    ${plan.services.travelAgency.map(agency => 
                        `<li>
                            <span>${agency.name} (${agency.rating}⭐)</span>
                            <span class="price">${agency.price}</span>
                        </li>`
                    ).join('')}
                </ul>
            </div>

            <div class="service-card">
                <h3>🏨 推薦住宿</h3>
                <ul class="service-list">
                    ${plan.services.hotels.map(hotel => 
                        `<li>
                            <span>${hotel.name} (${hotel.rating}⭐)</span>
                            <span class="price">${hotel.price}</span>
                        </li>`
                    ).join('')}
                </ul>
            </div>

            <div class="service-card">
                <h3>🚗 租車服務</h3>
                <ul class="service-list">
                    ${plan.services.carRental.map(car => 
                        `<li>
                            <span>${car.name} (${car.rating}⭐)</span>
                            <span class="price">${car.price}</span>
                        </li>`
                    ).join('')}
                </ul>
            </div>

            <div class="service-card">
                <h3>👨‍💼 導遊服務</h3>
                <ul class="service-list">
                    ${plan.services.guides.map(guide => 
                        `<li>
                            <span>${guide.name} (${guide.rating}⭐)</span>
                            <span class="price">${guide.price}</span>
                        </li>`
                    ).join('')}
                </ul>
            </div>

            <div class="itinerary">
                <h3>📅 詳細行程安排</h3>
                ${plan.itinerary.map(day => `
                    <div class="day-plan">
                        <h4>第${day.day}天：${day.title}</h4>
                        <ul>
                            ${day.activities.map(activity => `<li>${activity}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <div class="recommendation">
                <h3>💡 旅遊建議</h3>
                <h4>📦 打包清單</h4>
                <ul>
                    ${plan.recommendations.packing.map(item => `<li>${item}</li>`).join('')}
                </ul>
                
                <h4>💡 旅遊貼士</h4>
                <ul>
                    ${plan.recommendations.tips.map(tip => `<li>${tip}</li>`).join('')}
                </ul>
                
                <h4>🚨 緊急聯絡</h4>
                <ul>
                    ${plan.recommendations.emergency.map(contact => `<li>${contact}</li>`).join('')}
                </ul>
            </div>

            <div style="text-align: center; margin-top: 30px;">
                <button class="btn" onclick="window.print()">🖨️ 列印行程</button>
                <button class="btn" onclick="location.reload()">🔄 重新規劃</button>
            </div>
        `;

        this.results.innerHTML = resultsHTML;
        this.results.classList.add('show');
    }
}

// 初始化旅遊諮詢系統
document.addEventListener('DOMContentLoaded', () => {
    new TravelConsultant();
}); 