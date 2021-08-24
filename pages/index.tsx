import { ChangeEventHandler, SetStateAction, useEffect, useState } from 'react';
import { Dispatch, FC } from 'react';
import { createUseStyles, useTheme } from 'react-jss';

type ThemeType = { [Property in 'background' | 'text']: string };
type AppPropsType = { setTheme: Dispatch<SetStateAction<ThemeType>> };

const CENTERED_FLEX_CONTAINER = 'centered-flex-container';

const useStyles = createUseStyles(({ background, text }: ThemeType) => ({
  '@global': {
    body: {
      padding: 0,
      margin: 0,
    },
  },
  [CENTERED_FLEX_CONTAINER]: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  container: {
    composes: `$${CENTERED_FLEX_CONTAINER}`,
    background,
    font: { family: 'monospace', size: 20 },
    width: '100vw',
    height: '100vh',
  },

  colorContainer: ({ color }: any) => ({ color }),

  contentContainer: {
    composes: [`$${CENTERED_FLEX_CONTAINER}`],
    flex: { direction: 'column' },
  },

  inputsContainer: {
    margin: [8, 0, 0, 0],
    padding: 10,
    '& input': {
      outline: 'none',
      border: '1px solid',
      borderRadius: 8,
      padding: [6, 8],
      margin: [0, 4],
      color: text,
      background: 'transparent',
    },
  },
}));

const App: FC<AppPropsType> = ({ setTheme }) => {
  const theme = useTheme<ThemeType>();
  const [color, setColor] = useState(theme.text);

  const toGetRandomColor = () => `#${Math.random().toString(16).substr(-6)}`;

  useEffect(() => {
    const interval = setInterval(() => {
      setColor(toGetRandomColor());
    }, 420);
    return () => clearInterval(interval);
  }, []);

  const { container, contentContainer, inputsContainer, colorContainer } = useStyles({ color } as any);

  const onChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value, name } }) => {
    setTheme((state) => ({ ...state, [name]: value }));
  };
  const themeKeysArr = Object.keys(theme) as (keyof ThemeType)[];

  return (
    <div className={`${container} ${colorContainer}`}>
      <div className={contentContainer}>
        <div>STOP USE CSS, USE JSS INSTEAD.</div>
        <div className={inputsContainer}>
          {themeKeysArr.map((name) => {
            return (
              <input value={theme[name]} placeholder={name.toUpperCase()} onChange={onChange} name={name} key={name} />
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default App;
