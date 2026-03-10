import { Box, Typography, Modal, IconButton, LinearProgress } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import LockIcon from '@mui/icons-material/Lock';
import { tokens } from '@org/shared';

type LevelData = {
  level: number;
  score: number | null;
  attempted: boolean;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onViewExplanation: (level: number) => void;
  levelsData?: LevelData[];
  totalTimeTaken?: string;
};

const defaultLevels: LevelData[] = [
  { level: 1, score: 60,   attempted: true  },
  { level: 2, score: 0,    attempted: true  },
  { level: 3, score: null, attempted: false },
  { level: 4, score: null, attempted: false },
  { level: 5, score: null, attempted: false },
];

const MESH_SVG = encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80"><circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.35)"/><circle cx="40" cy="10" r="2" fill="rgba(255,255,255,0.25)"/><circle cx="70" cy="10" r="2" fill="rgba(255,255,255,0.35)"/><circle cx="25" cy="35" r="2" fill="rgba(255,255,255,0.3)"/><circle cx="55" cy="35" r="2" fill="rgba(255,255,255,0.3)"/><circle cx="10" cy="60" r="2" fill="rgba(255,255,255,0.35)"/><circle cx="40" cy="60" r="2" fill="rgba(255,255,255,0.25)"/><circle cx="70" cy="60" r="2" fill="rgba(255,255,255,0.35)"/><line x1="10" y1="10" x2="40" y2="10" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="40" y1="10" x2="70" y2="10" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="10" y1="10" x2="25" y2="35" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="40" y1="10" x2="25" y2="35" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="40" y1="10" x2="55" y2="35" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="70" y1="10" x2="55" y2="35" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="25" y1="35" x2="10" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="25" y1="35" x2="40" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="55" y1="35" x2="40" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="55" y1="35" x2="70" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="10" y1="60" x2="40" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/><line x1="40" y1="60" x2="70" y2="60" stroke="rgba(255,255,255,0.15)" stroke-width="1"/></svg>`);

function Bars3DSVG() {
  const W = 160, H = 280, base = H - 4;
  const bars = [{ x:2,w:30,d:14,h:130},{x:42,w:30,d:14,h:210},{x:82,w:30,d:14,h:160},{x:122,w:30,d:14,h:100}];
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} xmlns="http://www.w3.org/2000/svg" style={{flexShrink:0}}>
      {bars.map((b,i)=>{
        const top=base-b.h;
        const front=`${b.x},${base} ${b.x+b.w},${base} ${b.x+b.w},${top} ${b.x},${top}`;
        const right=`${b.x+b.w},${base} ${b.x+b.w+b.d},${base-b.d} ${b.x+b.w+b.d},${top-b.d} ${b.x+b.w},${top}`;
        const top4=`${b.x},${top} ${b.x+b.w},${top} ${b.x+b.w+b.d},${top-b.d} ${b.x+b.d},${top-b.d}`;
        return(<g key={i}><polygon points={front} fill="rgba(220,225,238,0.18)"/><polygon points={right} fill="rgba(185,193,212,0.12)"/><polygon points={top4} fill="rgba(240,243,250,0.25)"/><polygon points={front} fill="none" stroke="rgba(180,188,208,0.25)" strokeWidth="0.8"/><polygon points={right} fill="none" stroke="rgba(180,188,208,0.25)" strokeWidth="0.8"/><polygon points={top4} fill="none" stroke="rgba(180,188,208,0.25)" strokeWidth="0.8"/></g>);
      })}
    </svg>
  );
}

export function PerformanceAnalyticsModal({ open, onClose, onViewExplanation, levelsData=defaultLevels, totalTimeTaken='7.1m' }: Props) {
  const attempted = levelsData.filter(l=>l.attempted);
  const passed    = levelsData.filter(l=>l.attempted&&l.score!==null&&l.score>0);
  const avgScore  = attempted.length>0 ? Math.round(attempted.reduce((s,l)=>s+(l.score??0),0)/attempted.length) : 0;

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{position:'absolute',top:'50%',left:'50%',transform:'translate(-50%,-50%)',width:{xs:'95vw',sm:520},maxHeight:'90vh',overflowY:'auto',background:'#fff',borderRadius:4,boxShadow:'0 24px 64px rgba(0,0,0,0.22)',outline:'none',p:3.5}}>
        <Box sx={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',mb:2}}>
          <Box>
            <Typography variant="h5" fontWeight={800} color={tokens.primary}>Performance Analytics</Typography>
            <Typography fontSize={13} color={tokens.textMuted}>Tracking your progress over time</Typography>
          </Box>
          <IconButton onClick={onClose} size="small" sx={{width:34,height:34,border:'1.5px solid #c7c7c7',borderRadius:'50%',color:'#555',p:0,'&:hover':{background:'#f0f0f0'}}}>
            <CloseIcon sx={{fontSize:18}}/>
          </IconButton>
        </Box>

        <Box sx={{borderRadius:3,overflow:'hidden',mb:3,position:'relative',background:'linear-gradient(105deg,#060c2e 0%,#0e1a6e 30%,#5b0f6b 60%,#a8122a 85%,#c41230 100%)',p:2.5}}>
          <Box sx={{position:'absolute',inset:0,backgroundImage:`url("data:image/svg+xml,${MESH_SVG}")`,backgroundSize:'80px 80px',pointerEvents:'none'}}/>
          <Typography fontWeight={800} fontSize={15} sx={{color:'#7dd3fc',mb:1.5,position:'relative'}}>Overall Performance</Typography>
          <Box sx={{display:'flex',gap:4,mb:2,position:'relative'}}>
            {[{val:`${attempted.length}/5`,label:'Levels Attempted'},{val:`${passed.length}`,label:'Level Passed'},{val:totalTimeTaken,label:'Total Time Taken'}].map(s=>(
              <Box key={s.label}>
                <Typography fontSize={24} fontWeight={800} color="#fff" lineHeight={1}>{s.val}</Typography>
                <Typography fontSize={11} color="rgba(255,255,255,0.65)" mt={0.3}>{s.label}</Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{position:'relative'}}>
            <Box sx={{display:'flex',justifyContent:'space-between',mb:0.6}}>
              <Typography fontSize={12} color="rgba(255,255,255,0.85)" fontWeight={500}>Average Score</Typography>
              <Typography fontSize={12} fontWeight={700} color="#fff">{avgScore}%</Typography>
            </Box>
            <LinearProgress variant="determinate" value={avgScore} sx={{height:7,borderRadius:4,background:'rgba(255,255,255,0.18)','& .MuiLinearProgress-bar':{background:'linear-gradient(90deg,#38bdf8,#6366f1)',borderRadius:4}}}/>
            <Typography fontSize={11} fontStyle="italic" color="rgba(255,255,255,0.5)" sx={{mt:0.7}}>Keep going to improve your score!</Typography>
          </Box>
        </Box>

        <Typography variant="h6" fontWeight={800} color={tokens.primary} sx={{mb:2}}>Level Details</Typography>

        <Box sx={{display:'flex',gap:1,alignItems:'flex-start'}}>
          <Box sx={{flex:1,display:'flex',flexDirection:'column'}}>
            {levelsData.map((lvl,idx)=>{
              const isLocked=!lvl.attempted;
              const isPassed=lvl.attempted&&lvl.score!==null&&lvl.score>0;
              const isAttempted=lvl.attempted&&!isPassed;
              const isLast=idx===levelsData.length-1;
              return (
                <Box key={lvl.level} sx={{display:'flex',alignItems:'stretch',gap:2}}>
                  <Box sx={{display:'flex',flexDirection:'column',alignItems:'center',flexShrink:0,width:52}}>
                    <Box sx={{width:52,height:52,borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,background:isPassed?`linear-gradient(135deg,#1565c0,${tokens.btnPrimary})`:isAttempted?'linear-gradient(135deg,#00b4d8,#48cae4)':'#8b9099',border:isLocked?'2px solid #6b7280':'none',boxShadow:isPassed?'0 3px 12px rgba(21,101,192,0.4)':isAttempted?'0 3px 12px rgba(0,180,216,0.4)':'none'}}>
                      {isPassed&&<EmojiEventsIcon sx={{color:'#fff',fontSize:24}}/>}
                      {isAttempted&&<HourglassBottomIcon sx={{color:'#fff',fontSize:22}}/>}
                      {isLocked&&<Typography fontWeight={700} fontSize={16} color="#fff">{lvl.level}</Typography>}
                    </Box>
                    {!isLast&&<Box sx={{width:2,flex:1,minHeight:20,background:'#6b7280',my:'2px'}}/>}
                  </Box>
                  <Box sx={{display:'flex',alignItems:'center',gap:2,flex:1,pb:isLast?0:1.8}}>
                    <Box sx={{flex:1}}>
                      <Box sx={{display:'flex',alignItems:'center',gap:0.7}}>
                        <Typography fontWeight={700} fontSize={15} color={isLocked?tokens.textMuted:tokens.primary}>Level {lvl.level}</Typography>
                        {isLocked&&<LockIcon sx={{fontSize:14,color:'#9ca3af'}}/>}
                      </Box>
                      {!isLocked&&<Typography fontSize={13} color={tokens.textMuted}>Score: {lvl.score}%</Typography>}
                    </Box>
                    {!isLocked&&(
                      <Box component="button"
                        onClick={()=>{ onClose(); onViewExplanation(lvl.level); }}
                        sx={{background:`linear-gradient(90deg,#1e3a8a,${tokens.btnPrimary})`,color:'#fff',border:'none',borderRadius:2,px:2,py:1,fontSize:12.5,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap',flexShrink:0,transition:'opacity 0.15s','&:hover':{opacity:0.85}}}>
                        View Explanation
                      </Box>
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
          <Box sx={{alignSelf:'flex-end',flexShrink:0}}><Bars3DSVG/></Box>
        </Box>
      </Box>
    </Modal>
  );
}