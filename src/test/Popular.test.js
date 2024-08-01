import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Popular from "../modules/home/widgets/Popular"; // Sesuaikan dengan path komponen Anda

// Setup axios mock
const mock = new MockAdapter(axios);

// Contoh data respons API
const mockData = {
  results: [
    {
      id: 1,
      title: "Test Movie",
      poster_path: "/test-poster.jpg",
      release_date: "2024-01-01",
    },
  ],
};

test("renders Popular component and fetches data", async () => {
  // Mock the API request
  mock.onGet(`https://api.themoviedb.org/3/movie/popular`).reply(200, mockData);

  // Render component
  render(<Popular />);

  // Assert that the movie title appears in the document
  await waitFor(() => {
    expect(screen.getByText("Test Movie")).toBeInTheDocument();
  });

  // Assert that the image has been loaded with the correct src
  const img = screen.getByAltText("poster");
  expect(img).toHaveAttribute(
    "src",
    `https://image.tmdb.org/t/p/w500/test-poster.jpg`
  );
});
