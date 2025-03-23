import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Rates {
    USD: number;
    EUR: number;
    GBP: number;
}

const ExchangeRate: React.FC = () => {
    const { t } = useTranslation(); // Хук для перевода строк
    const [rates, setRates] = useState<Rates | null>(null);
    const [receivedAt, setReceivedAt] = useState<Date | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    // useEffect для загрузки данных о курсах валют при монтировании компонента
    useEffect(() => {
        const fetchRates = async () => {
            try {
                // Отправляем GET-запрос на API для получения курсов валют
                const response = await fetch('https://v1.apiplugin.io/v1/currency/mcdZO6Qy/rates', {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                });

                if (!response.ok) {
                    throw new Error(t('error_fetching_data'));
                }

                const data = await response.json();

                const rub = data.rates.RUB;

                // Рассчитываем курс рубля к USD, EUR и GBP
                const rublePerUsd = rub;
                const rublePerEur = rub / data.rates.EUR;
                const rublePerGbp = rub / data.rates.GBP;

                // Обновляем состояние с полученными курсами валют
                setRates({
                    USD: rublePerUsd,
                    EUR: rublePerEur,
                    GBP: rublePerGbp,
                });

                if (!receivedAt) {
                    setReceivedAt(new Date());
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchRates();
    }, [t, receivedAt]);

    // Если данные всё ещё загружаются, показываем индикатор загрузки
    if (loading) {
        return <div>{t('loading')}</div>;
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return <div>{t('error')}: {error}</div>;
    }

    return (
        <div>
            <h2>{t('Курсы валют')}</h2>
            {rates && (
                <ul>
                    <li>
                        {t('USD')}:{" "}
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(rates.USD)}
                    </li>
                    <li>
                        {t('EUR')}:{" "}
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(rates.EUR)}
                    </li>
                    <li>
                        {t('GBP')}:{" "}
                        {new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB' }).format(rates.GBP)}
                    </li>
                </ul>
            )}
            {receivedAt && (
                <div>
                    {t('Курсы получены: ')}:{" "}
                    {new Intl.DateTimeFormat('ru-RU', {
                        dateStyle: 'full',
                        timeStyle: 'long'
                    }).format(receivedAt)}
                </div>
            )}
        </div>
    );
};

export default ExchangeRate;
