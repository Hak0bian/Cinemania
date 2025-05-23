import { useState, useEffect } from 'react'
import { clearActorsResults, searchActorThunk } from '../../../store/slices'
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks'
import styles from './SearchActor.module.css'
import SearchedActorsList from '../SearchedActorsList/SearchedActorsList'
import { translations } from '../../../translations/translations'

const SearchActor = () => {
    const dispatch = useAppDispatch();
    const { selectedLanguage } = useAppSelector((state) => state.languagesData);
    const t = translations[selectedLanguage].actors
    const [inputValue, setInputValue] = useState<string>("");

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value)
    }

    useEffect(() => {
        const delaySearch = setTimeout(() => {
            if (inputValue.trim()) {
                dispatch(searchActorThunk(inputValue));
            } else {
                dispatch(clearActorsResults())
            }
        }, 500);
        return () => clearTimeout(delaySearch);
    }, [inputValue]);

    return (
        <div className={styles.searchDiv}>
            <input
                type="text"
                placeholder={t.search}
                value={inputValue}
                onChange={(e) => handleSearch(e)}
                className={styles.searchActorInput}
            />
            <SearchedActorsList inputValue={inputValue} setInputValue={setInputValue} />
        </div>
    )
}

export default SearchActor