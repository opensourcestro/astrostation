import create from "zustand";
import { persist } from "zustand/middleware";
import {
  IAudioVolume,
  IAlarmOption,
  ITimer,
  IPosTimerSettings,
  IHasStarted,
  IBreakStarted,
  IShortBreakTime,
  ILongBreakTime,
  IPomodoroTime,
  IStickyNote,
  IStickyNoteState,
  IToggleStickyNote,
  ColorOptions,
  ITask,
  ITaskState,
  ISongTask,
  ISongState,
  IBackground,
  IToggleTasks,
  IPosTask,
  IToggleMusic,
  IPosMusic,
  IToggleSpotify,
  IPosSpotify,
  IToggleTimer,
  IPosTimer,
  IDarkModeState,
  IFullscreenState,
  IToggleQuote,
  IPosQuote,
  IToggleWidgetReset,
  IToggleTwitch,
  IPosTwitch,
  IFirstTimeUserState,
  IGrid,
  ILockWidgets,
  ISideNavOrderStore,
  IToggleYoutube,
  IPosYoutube,
  IToggleKanban,
  IPosKanban,
  ISeoContent,
  IKanbanBoardState,
} from "./interfaces";
import { InfoSection } from "./pages/InfoSection";
import { uuid } from "uuidv4";
import { v4 } from "uuid";

/**
 * Grid Store
 * ---
 * Handler for Grid Value
 */

export const useGrid = create<IGrid>(
  persist(
    (set, _) => ({
      grid: null,
      setGrid: gridVal => set({ grid: gridVal }),
      setGridDefault: () => set(() => ({ grid: null })),
    }),
    { name: "set_grid" }
  )
);

/**
 * Audio Volume Store
 * ---
 * Handler for Audio Volume
 */

export const useAudioVolume = create<IAudioVolume>(
  persist(
    (set, _) => ({
      audioVolume: 0.7,
      setAudioVolume: volume => set({ audioVolume: volume }),
    }),
    { name: "set_audio_volume" }
  )
);

export const usePlayerAudioVolume = create<IAudioVolume>(
  persist(
    (set, _) => ({
      audioVolume: 75,
      setAudioVolume: volume => set({ audioVolume: volume }),
    }),
    { name: "set_player_audio_volume" }
  )
);

/**
 * Alarm Option Store
 * ---
 * Handler for Alarm Option
 */

export const useAlarmOption = create<IAlarmOption>(
  persist(
    (set, _) => ({
      alarm:
        "https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav",
      setAlarm: alarmPath => set({ alarm: alarmPath }),
    }),
    { name: "set_alarm" }
  )
);

/**
 * Timer Store
 * ---
 * Handler for Timer
 */

export const useTimer = create<ITimer>(set => ({
  timerQueue: 60,
  setTimerQueue: newTime => set({ timerQueue: newTime }),
}));

/**
 * Settings Store
 * ---
 * Handler for Settings
 */

export const usePosTimerSettings = create<IPosTimerSettings>(
  persist(
    (set, _) => ({
      timerSettingsPosX: 750,
      timerSettingsPosY: -200,
      setTimerSettingsPos: (X, Y) => set({ timerSettingsPosX: X, timerSettingsPosY: Y }),
      setTimerSettingsPosDefault: () => set(() => ({ timerSettingsPosX: 400, timerSettingsPosY: 0 })),
    }),
    {
      name: "set_timer_settings_position",
    }
  )
);

/**
 * Has Started Store
 * ---
 * Handler has started in timer sessions
 */

export const useHasStarted = create<IHasStarted>(set => ({
  hasStarted: false,
  setHasStarted: hasStarted => set({ hasStarted }),
}));

/**
 * Break Started Store
 * ---
 * Handler break started in timer sessions
 */

export const useBreakStarted = create<IBreakStarted>(set => ({
  breakStarted: false,
  setBreakStarted: breakStarted => set({ breakStarted }),
}));

/**
 * Break Time Store
 * ---
 * Handle break times
 */

export const useShortBreakTimer = create<IShortBreakTime>(
  persist(
    (set, _) => ({
      shortBreakLength: 300,
      defaultShortBreakLength: () => set(() => ({ shortBreakLength: 300 })),
      setShortBreak: value => set({ shortBreakLength: value }),
    }),
    { name: "short_break_timer_length" }
  )
);

export const useLongBreakTimer = create<ILongBreakTime>(
  persist(
    (set, _) => ({
      longBreakLength: 900,
      defaultLongBreakLength: () => set(() => ({ longBreakLength: 900 })),
      setLongBreak: value => set({ longBreakLength: value }),
    }),
    { name: "long_break_timer_length" }
  )
);

/**
 * Pomodoro Time Store
 * ---
 * Handle pomodoro times
 */

export const usePomodoroTimer = create<IPomodoroTime>(
  persist(
    (set, _) => ({
      pomodoroLength: 1500,
      defaultPomodoroLength: () => set(() => ({ pomodoroLength: 1500 })),
      setPomodoroLength: value => set({ pomodoroLength: value }),
    }),
    { name: "pomodoro_timer_length" }
  )
);

/**
 * Sticky Note Store
 * ---
 * Handle the sticky notes created in the tasks section
 */

export const useToggleStickyNote = create<IToggleStickyNote>(
  persist(
    (set, _) => ({
      isStickyNoteShown: false,
      setIsStickyNoteShown: isStickyNoteShown => set({ isStickyNoteShown }),
    }),
    {
      name: "state_sticky_note",
    }
  )
);

export const useStickyNote = create<IStickyNoteState>(
  persist(
    (set, _) => ({
      stickyNotes: [],
      addStickyNote: (text: string) => {
        set(state => ({
          stickyNotes: [
            ...state.stickyNotes,
            {
              id: Date.now() + state.stickyNotes.length,
              text: text,
              color: ColorOptions.pastelYellow,
              stickyNotesPosX: 165,
              stickyNotesPosY: 0,
            } as IStickyNote,
          ],
        }));
      },
      /**
       * TODO: make new dynamic type for any types
       * of edit on Note
       */
      editNote: (id, newProp, newValue) => {
        set(state => ({
          stickyNotes: state.stickyNotes.map(note =>
            note.id === id
              ? {
                  ...note,
                  [newProp]: newValue,
                }
              : note
          ),
        }));
      },
      removeNote: id => {
        set(state => ({
          stickyNotes: state.stickyNotes.filter(note => note.id !== id),
        }));
      },
      setStickyNotesPos: (id, X, Y) => {
        set(state => ({
          stickyNotes: state.stickyNotes.map(note =>
            note.id === id
              ? ({
                  ...note,
                  stickyNotesPosX: X,
                  stickyNotesPosY: Y,
                } as IStickyNote)
              : note
          ),
        }));
      },
    }),
    { name: "user_sticky_notes" }
  )
);

/**
 * Task Store
 * ---
 * Handle the tasks created in the tasks section
 */

export const useTask = create<ITaskState>(
  persist(
    (set, _) => ({
      tasks: [
        {
          id: Date.now(),
          description: "Task in progress",
          inProgress: true,
          completed: false,
          pomodoro: 1,
          pomodoroCounter: 0,
          alerted: false,
        } as ITask,
        {
          id: Date.now() + 1,
          description: "Task not in progress",
          inProgress: false,
          completed: false,
          pomodoro: 1,
          pomodoroCounter: 0,
          alerted: false,
        } as ITask,
      ],
      addTask: (description: string, count: number, isBreak: boolean) => {
        set(state => ({
          tasks: [
            {
              id: Date.now() + state.tasks.length,
              description,
              inProgress: false,
              completed: false,
              pomodoro: count,
              pomodoroCounter: isBreak ? -1 : 0,
              alerted: false,
              menuToggled: false,
            } as ITask,
            ...state.tasks,
          ],
        }));
      },
      renameTask: (id, newName) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? ({
                  ...task,
                  description: newName,
                } as ITask)
              : task
          ),
        }));
      },
      removeTask: id => {
        set(state => ({
          tasks: state.tasks.filter(task => task.id !== id),
        }));
      },
      removeAllTasks: () => set({ tasks: [] }),
      toggleInProgressState: (id, flag) => {
        set(state => ({
          tasks: state.tasks.map(task => (task.id === id ? ({ ...task, inProgress: flag } as ITask) : task)),
        }));
      },
      setCompleted: (id, flag) => {
        set(state => ({
          tasks: state.tasks.map(task => (task.id === id ? ({ ...task, completed: flag } as ITask) : task)),
        }));
      },
      setPomodoroCounter: id => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? ({
                  ...task,
                  pomodoroCounter: task.pomodoroCounter < task.pomodoro ? task.pomodoroCounter + 1 : task.pomodoro,
                } as ITask)
              : task
          ),
        }));
      },
      setPomodoro: (id, newVal) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? ({
                  ...task,
                  pomodoro: newVal,
                } as ITask)
              : task
          ),
        }));
      },
      alertTask: (id, flag) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? ({
                  ...task,
                  alerted: flag,
                } as ITask)
              : task
          ),
        }));
      },
      toggleMenu: (id, flag) => {
        set(state => ({
          tasks: state.tasks.map(task =>
            task.id === id
              ? ({
                  ...task,
                  menuToggled: flag,
                } as ITask)
              : task
          ),
        }));
      },
    }),
    { name: "user_tasks" }
  )
);

/**
 * Song Store
 * ---
 * Handles the song played in the player
 */

const songs = [
  {
    id: "e3L1PIY1pN8",
    artist: "The Coffee Shop Radio",
    link: "https://www.youtube.com/watch?v=e3L1PIY1pN8",
  },
  {
    id: "jfKfPfyJRdk",
    artist: "Lofi Girl",
    link: "https://www.youtube.com/watch?v=jfKfPfyJRdk",
  },
  {
    id: "hi1cYzaLEig",
    artist: "Hip Hop Station",
    link: "https://www.youtube.com/watch?v=hi1cYzaLEig",
  },
  {
    id: "6uddGul0oAc",
    artist: "Tokyo Station",
    link: "https://www.youtube.com/watch?v=6uddGul0oAc",
  },
];

export const useSong = create<ISongState>(set => ({
  song: songs[0],
  setSong: songId => set({ song: songs.find(s => s.id === songId) as ISongTask }),
  toggledSong: "",
  setToggledSong: toggledSong => set({ toggledSong }),
}));

/**
 * Task Store
 * ---
 * Handle the tasks created in the tasks section
 */

export const useKanban = create<IKanbanBoardState>(
  persist(
    (set, _) => ({
      board: {
        columns: [
          {
            id: v4(),
            title: "To Do",
            tasks: [{ id: v4(), name: "Some important task" }],
          },
          {
            id: v4(),
            title: "In Progress",
            tasks: [{ id: v4(), name: "A thing in progress" }],
          },
          {
            id: v4(),
            title: "Done",
            tasks: [{ id: v4(), name: "It's done!" }],
          },
        ],
      },
      setColumns: (columns: any) => {
        set(state => ({
          board: {
            columns: columns,
          },
        }));
      },
    }),
    {
      name: "state_kanban_board",
    }
  )
);

/**
 * Background Store
 * ---
 * Handles the background image state of app
 */

export const useSetBackground = create<IBackground>(
  persist(
    (set, _) => ({
      backgroundId: 0,
      backgroundColor: "",
      setBackgroundColor: color => set({ backgroundColor: color }),
      setBackgroundId: backgroundId => set({ backgroundId }),
    }),
    {
      name: "app_background",
    }
  )
);

/**
 * Kanban board Store
 * ---
 * Handle the visibility of the Kanban board
 */

export const useToggleKanban = create<IToggleKanban>(
  persist(
    (set, _) => ({
      isKanbanToggled: false,
      setIsKanbanToggled: isKanbanToggled => set({ isKanbanToggled }),
      isKanbanShown: false,
      setIsKanbanShown: isKanbanShown => set({ isKanbanShown }),
    }),
    {
      name: "state_kanban_section",
    }
  )
);

export const usePosKanban = create<IPosKanban>(
  persist(
    (set, _) => ({
      kanbanPosX: 200,
      kanbanPosY: 0,
      setKanbanPos: (X, Y) => set({ kanbanPosX: X, kanbanPosY: Y }),
      setKanbanPosDefault: () => set(() => ({ kanbanPosX: 200, kanbanPosY: 0 })),
    }),
    {
      name: "set_kanban_position",
    }
  )
);

/**
 * Tasks Section Store
 * ---
 * Handle the visibility of the tasks section
 */

export const useToggleTasks = create<IToggleTasks>(
  persist(
    (set, _) => ({
      isTasksToggled: true,
      setIsTasksToggled: isTasksToggled => set({ isTasksToggled }),
      isTasksShown: true,
      setIsTasksShown: isTasksShown => set({ isTasksShown }),
    }),
    {
      name: "state_tasks_section",
    }
  )
);

export const usePosTask = create<IPosTask>(
  persist(
    (set, _) => ({
      taskPosX: 804,
      taskPosY: 302,
      setTaskPos: (X, Y) => set({ taskPosX: X, taskPosY: Y }),
      setTaskPosDefault: () => set(() => ({ taskPosX: 804, taskPosY: 306 })),
    }),
    {
      name: "set_task_position",
    }
  )
);

/**
 * Music Section Store
 * ---
 * Handle the selection music section
 */

export const useToggleMusic = create<IToggleMusic>(
  persist(
    (set, _) => ({
      isMusicToggled: true,
      setIsMusicToggled: isMusicToggled => set({ isMusicToggled }),
      isMusicShown: true,
      setIsMusicShown: isMusicShown => set({ isMusicShown }),
    }),
    {
      name: "state_music_section",
    }
  )
);

export const usePosMusic = create<IPosMusic>(
  persist(
    (set, _) => ({
      musicPosX: 400,
      musicPosY: 0,
      setMusicPos: (X, Y) => set({ musicPosX: X, musicPosY: Y }),
      setMusicPosDefault: () => set(() => ({ musicPosX: 400, musicPosY: 0 })),
    }),
    {
      name: "set_music_position",
    }
  )
);

/**
 * Spotify Section Store
 * ---
 * Handle the Spotify section
 */

export const useSpotifyMusic = create<IToggleSpotify>(
  persist(
    (set, _) => ({
      isSpotifyToggled: true,
      setIsSpotifyToggled: isSpotifyToggled => set({ isSpotifyToggled }),
      isSpotifyShown: true,
      setIsSpotifyShown: isSpotifyShown => set({ isSpotifyShown }),
    }),
    {
      name: "state_spotify_section",
    }
  )
);

export const usePosSpotify = create<IPosSpotify>(
  persist(
    (set, _) => ({
      spotifyPosX: 400,
      spotifyPosY: 158,
      setSpotifyPos: (X, Y) => set({ spotifyPosX: X, spotifyPosY: Y }),
      setSpotifyPosDefault: () => set(() => ({ spotifyPosX: 400, spotifyPosY: 158 })),
    }),
    {
      name: "set_spotify_position",
    }
  )
);

/**
 * Timer Section Store
 * ---
 * Handle the timer section
 */

export const useToggleTimer = create<IToggleTimer>(
  persist(
    (set, _) => ({
      isTimerToggled: true,
      setIsTimerToggled: isTimerToggled => set({ isTimerToggled }),
      isTimerShown: true,
      setIsTimerShown: isTimerShown => set({ isTimerShown }),
    }),
    { name: "state_timer_section" }
  )
);

export const usePosTimer = create<IPosTimer>(
  persist(
    (set, _) => ({
      timerPosX: 804,
      timerPosY: 0,
      setTimerPos: (X, Y) => set({ timerPosX: X, timerPosY: Y }),
      setTimerPosDefault: () => set(() => ({ timerPosX: 804, timerPosY: 0 })),
    }),
    {
      name: "set_timers_position",
    }
  )
);

/**
 * Dark Mode Store
 * ---
 * Handle different styling between app dark and light mode
 */

export const useDarkToggleStore = create<IDarkModeState>(
  persist(
    (set, _) => ({
      isDark: true,
      toggleDarkMode: () => set(oldState => ({ isDark: !oldState.isDark })),
      isDarkModeShown: false,
      setIsDarkModeShown: isDarkModeShown => set({ isDarkModeShown }),
    }),
    { name: "state_darkmode" }
  )
);

/**
 * Fullscreen Mode Store
 * ---
 * Handle state of fullscreen vs normal app view
 */

export const useFullScreenToggleStore = create<IFullscreenState>(
  persist(
    (set, _) => ({
      isFullscreen: false,
      toggleFullscreenMode: () => set(oldState => ({ isFullscreen: !oldState.isFullscreen })),
      isFullscreenShown: false,
      setIsFullscreenShown: isFullscreenShown => set({ isFullscreenShown }),
    }),
    { name: "state_fullscreen" }
  )
);

/**
 * Quote Section Store
 * ---
 * Handle the visibility of motivational/programming quotes
 */

export const useToggleQuote = create<IToggleQuote>(
  persist(
    (set, _) => ({
      isQuoteToggled: false,
      setIsQuoteToggled: isQuoteToggled => set({ isQuoteToggled }),
      isQuoteShown: false,
      setIsQuoteShown: isQuoteShown => set({ isQuoteShown }),
    }),
    {
      name: "state_quote_section",
    }
  )
);

export const usePosQuote = create<IPosQuote>(
  persist(
    (set, _) => ({
      quotePosX: 804,
      quotePosY: 572,
      setQuotePos: (X, Y) => set({ quotePosX: X, quotePosY: Y }),
      setQuotePosDefault: () => set(() => ({ quotePosX: 804, quotePosY: 572 })),
    }),
    {
      name: "set_quote_position",
    }
  )
);

/**
 * Reset Widgets Section Store
 * ---
 * Handle the visibility of the reset widget nav item
 */

export const useToggleWidgetReset = create<IToggleWidgetReset>(
  persist(
    (set, _) => ({
      isWidgetResetShown: false,
      setIsWidgetResetShown: isWidgetResetShown => set({ isWidgetResetShown }),
    }),
    {
      name: "state_widget_reset",
    }
  )
);

/**
 * Quote Section Store
 * ---
 * Handle the visibility of motivational/programming quotes
 */

export const useToggleTwitch = create<IToggleTwitch>(
  persist(
    (set, _) => ({
      isTwitchToggled: false,
      setIsTwitchToggled: isTwitchToggled => set({ isTwitchToggled }),
      isTwitchShown: false,
      setIsTwitchShown: isTwitchShown => set({ isTwitchShown }),
    }),
    {
      name: "state_twitch",
    }
  )
);

export const usePosTwitch = create<IPosTwitch>(
  persist(
    (set, _) => ({
      twitchPosX: 804,
      twitchPosY: 436,
      setTwitchPos: (X, Y) => set({ twitchPosX: X, twitchPosY: Y }),
      setTwitchPosDefault: () => set(() => ({ twitchPosX: 1208, twitchPosY: 0 })),
    }),
    {
      name: "set_twitch_position",
    }
  )
);

/**
 * Youtube Section Store
 * ---
 * Handle the Youtube section
 */

export const useToggleYoutube = create<IToggleYoutube>(
  persist(
    (set, _) => ({
      isYoutubeToggled: false,
      setIsYoutubeToggled: isYoutubeToggled => set({ isYoutubeToggled }),
      isYoutubeShown: false,
      setIsYoutubeShown: isYoutubeShown => set({ isYoutubeShown }),
    }),
    {
      name: "state_youtube",
    }
  )
);

export const usePosYoutube = create<IPosYoutube>(
  persist(
    (set, _) => ({
      youtubePosX: 804,
      youtubePosY: 436,
      setYoutubePos: (X, Y) => set({ youtubePosX: X, youtubePosY: Y }),
      setYoutubePosDefault: () => set(() => ({ youtubePosX: 1208, youtubePosY: 324 })),
    }),
    {
      name: "set_youtube_position",
    }
  )
);

/**
 * First-time user Store
 * ---
 * Handles storing key for whether current user is a new user
 */

export const useFirstTimeUserStore = create<IFirstTimeUserState>(
  persist(
    (set, _) => ({
      isFirstTimeUser: true,
      toggleIsFirstTimeUser: () => set(oldState => ({ isFirstTimeUser: !oldState.isFirstTimeUser })),
    }),
    { name: "first_time_user" }
  )
);

export const useUnsplashStore = create<any>(
  persist(
    (set, _) => ({
      dailyUnsplash: {},
      setDailyUnsplash: unsplashObject => set({ dailyUnsplash: unsplashObject }),
    }),
    { name: "unsplash_store" }
  )
);
/**
 * Lock Widgets Store
 * ---
 * Handles storing key for determining if widgets are allowed to be moved
 */

export const useLockWidgetsStore = create<ILockWidgets>(
  persist(
    (set, _) => ({
      areWidgetsLocked: false,
      setAreWidgetsLocked: areWidgetsLocked => set({ areWidgetsLocked }),
    }),
    { name: "state_widgets_lock" }
  )
);

/**
 * Side Nav Item Store
 * ---
 * Handles storing side nav item order
 */

export const useSideNavOrderStore = create<ISideNavOrderStore>(
  persist(
    (set, _) => ({
      sideNavOrder: [...Array(20).keys()],
      setSideNavOrder: sideNavOrder => set({ sideNavOrder }),
    }),
    { name: "side_nav_order" }
  )
);

/**
 * Toggle SEO Content
 * ---
 * Handles storing SEO content visibility
 */
export const useSeoVisibilityStore = create<ISeoContent>(
  persist(
    (set, _) => ({
      isSeoVisible: true,
      setSeoVisibility: isSeoVisible => set({ isSeoVisible }),
    }),
    { name: "state_seo_visibility" }
  )
);
