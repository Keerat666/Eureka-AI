import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import getChapters from '../../services/chapters'; // Assuming a service to fetch chapters
import CircularProgress from '@material-ui/core/CircularProgress'; // Import for loader
import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, Button, Grid } from '@material-ui/core'; // Import Grid

const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();
  const topic = location.state?.topic; // Access data using optional chaining
  const description = location.state?.description;

  useEffect(() => {
    const fetchChapters = async () => {
      setIsLoading(true);
      setChapters([]);
      const res = await getChapters(topic, description);
      setChapters(res.results); // Assuming chapters are returned in "results"
      setIsLoading(false);
    };

    if (topic) {
      fetchChapters();
    }
  }, [topic]);

  const truncateContent = (text, maxLength) => {
    return text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}> {/* Vertical centering */}
      {isLoading && (
        <> {/* Wrap loader and text in a fragment */}
          <CircularProgress size={40} />
          <p>Generating chapters for {topic} ...</p>
        </>
      )} {/* Show loader and text while fetching chapters */}
      {chapters.length > 0 && (
        <> {/* Wrap heading and grid in a fragment */}
          <div>
            <Typography variant="h4" style={{marginTop : 20}}>{topic}</Typography>
          </div>
          <Grid container spacing={2}> {/* Grid container with spacing between cards */}
            {chapters.map((chapter) => (
              <Grid item xs={12} key={chapter.id}> {/* One card per row */}
                <Card style={{ display: 'flex', flexDirection: 'column' }}> {/* Card with flexbox layout */}
                  <CardHeader
                    title={
                      <> {/* Wrap chapter number and title */}
                        <Typography variant="h5">{chapter.title}</Typography>
                      </>
                    }
                  />
                  <CardContent style={{ flexGrow: 1 }}> {/* Content area with flex grow */}
                    <Typography variant="body1">
                      {truncateContent(chapter.content)} {/* Truncate and add ellipsis */}
                    </Typography>
                    <Button variant="contained" color="primary" style={{ marginTop: 10 }}>
                      Start Learning
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
      {!isLoading && chapters.length === 0 && <Typography>No chapters found for this topic.</Typography>}
    </div>
  );
};

export default Chapters;
