// Функція для зчитування даних з файлу за допомогою FileReader
            function handleFileSelect(event) {
                const file = event.target.files[0]; // Отримуємо перший вибраний файл
                const reader = new FileReader(); // Створюємо об'єкт FileReader

                // Викликається при успішному завершенні читання файлу
                reader.onload = function (event) {
                    const fileContent = event.target.result; // Отримуємо вміст файлу
                    const dataArray = fileContent.trim().split('\n').map(Number); // Перетворюємо рядки файлу в масив чисел

                    processData(dataArray); // Обробляємо дані
                };

                // Викликається, якщо відбулася помилка читання файлу
                reader.onerror = function (event) {
                    console.error("Помилка читання файлу:", event.target.error);
                };

                // Читаємо вміст файлу як текст
                reader.readAsText(file);
            }

            // Функція для обробки даних
            function processData(dataArray) {
                let maxNumber = dataArray[0]; // Ініціалізуємо максимальне число першим елементом масиву
                let minNumber = dataArray[0]; // Ініціалізуємо мінімальне число першим елементом масиву
                let sum = 0; // Ініціалізуємо суму для обчислення середнього значення
                let increasingSequenceLength = 1; // Довжина найбільшої зростаючої послідовності
                let decreasingSequenceLength = 1; // Довжина найбільшої зменшуючої послідовності

                for (let i = 0; i < dataArray.length; i++) {
                    const num = dataArray[i];
                    sum += num;
                    if (num > maxNumber) {
                        maxNumber = num;
                    }
                    if (num < minNumber) {
                        minNumber = num;
                    }
                    if (i > 0) {
                        if (num > dataArray[i - 1]) {
                            increasingSequenceLength++;
                            decreasingSequenceLength = 1;
                        } else if (num < dataArray[i - 1]) {
                            decreasingSequenceLength++;
                            increasingSequenceLength = 1;
                        }
                    }
                }

                // Знаходимо медіану (застосовуючи оптимізований алгоритм)
                const median = findMedian(dataArray);

                // Вивід результатів у консоль
                console.log("Максимальне число в файлі:", maxNumber);
                console.log("Мінімальне число в файлі:", minNumber);
                console.log("Медіана:", median);
                console.log("Середнє арифметичне значення:", sum / dataArray.length);
                console.log("Найбільша зростаюча послідовність:", increasingSequenceLength);
                console.log("Найбільша зменшуюча послідовність:", decreasingSequenceLength);
            }

            // Функція для знаходження медіани в масиві (використовує алгоритм Quickselect)
            function findMedian(array) {
                const len = array.length;
                const mid = Math.floor(len / 2);
                if (len % 2 === 0) {
                    return (quickselect(array.slice(), mid - 1) + quickselect(array.slice(), mid)) / 2;
                } else {
                    return quickselect(array.slice(), mid);
                }
            }

            // Функція для швидкого вибору k-го елемента в масиві (використовує алгоритм Quickselect)
            function quickselect(arr, k) {
                const swap = (i, j) => [arr[i], arr[j]] = [arr[j], arr[i]]; // Функція для обміну двох елементів масиву

                const partition = (left, right, pivotIndex) => {
                    const pivotValue = arr[pivotIndex];
                    swap(pivotIndex, right);
                    let storeIndex = left;
                    for (let i = left; i < right; i++) {
                        if (arr[i] < pivotValue) {
                            swap(storeIndex, i);
                            storeIndex++;
                        }
                    }
                    swap(right, storeIndex);
                    return storeIndex;
                };

                const recurse = (left, right, k) => {
                    if (left === right) return arr[left];
                    const pivotIndex = left + Math.floor(Math.random() * (right - left + 1));
                    const pivotNewIndex = partition(left, right, pivotIndex);
                    if (k === pivotNewIndex) {
                        return arr[k];
                    } else if (k < pivotNewIndex) {
                        return recurse(left, pivotNewIndex - 1, k);
                    } else {
                        return recurse(pivotNewIndex + 1, right, k);
                    }
                };

                return recurse(0, arr.length - 1, k);
            }

            // Отримуємо посилання на елемент <input type="file">
            const fileInput = document.getElementById('fileInput');

            // Додаємо обробник події "change"
            fileInput.addEventListener('change', handleFileSelect);