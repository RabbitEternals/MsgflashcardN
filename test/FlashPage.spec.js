import {render,screen} from "@testing-library/vue";
import FlashPage from "../pages/FlashPage";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

describe("Echo Page", () => {
    describe("Layout", () => {
        it("has question input", () => {
            render(FlashPage);
            const input = screen.queryByLabelText("Question");
            expect(input).toBeInTheDocument();
        });
        it("has answer input", () => {
            render(FlashPage);
            const input = screen.queryByLabelText("Answer");
            expect(input).toBeInTheDocument();
        });
        it("has add button", () => {
            render(FlashPage);
            const button = screen.queryByRole("button",{name:"Add"});
            expect(button).toBeInTheDocument();
        });
        it("add button initially disabled", () => {
            render(FlashPage);
            const button = screen.queryByRole("button",{name:"Add"});
            expect(button).toBeDisabled();
        });
    });
    describe("Interactions", () => {
        it("enables button after typing into input fields",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            expect(button).toBeEnabled();
        });
        it("clears inputs after clicking button",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            await userEvent.click(button);
            expect(questionInput.value).toBe("");
            expect(answerInput.value).toBe("");
        });
        it("displays question card on screen after clicking button",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            await userEvent.click(button);
            const text = screen.queryByText("QuestionTest");
            expect(text).toBeInTheDocument();
        });
        it("initially hides answer",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            await userEvent.click(button);
            await screen.queryByText("QuestionTest");
            expect(screen.queryByText("AnswerTest")).not.toBeVisible();
        });
        it("displays answer after clicking on card",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            await userEvent.click(button);
            const question = await screen.queryByText("QuestionTest");
            await userEvent.click(question);
            expect(screen.queryByText("AnswerTest")).toBeVisible();
        });
        it("hides answer after clicking on card while its shown",async () => {
            render(FlashPage);
            const questionInput = screen.queryByLabelText("Question");
            const answerInput = screen.queryByLabelText("Answer");
            await userEvent.type(questionInput,"QuestionTest");
            await userEvent.type(answerInput,"AnswerTest");
            const button = screen.queryByRole("button",{name:"Add"});
            await userEvent.click(button);
            const question = await screen.queryByText("QuestionTest");
            await userEvent.click(question);
            await userEvent.click(question);
            expect(screen.queryByText("AnswerTest")).not.toBeVisible();
        });
    });
});
